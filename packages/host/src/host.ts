import {
  ClientSent,
  ClientType,
  GamePreview,
  ServerSent,
  ServerType,
} from '../../pipe/src/messages';
import WebSocket from 'ws';
import { GameManifest, User, UserState } from './types';
import { addSeconds, isAfter } from 'date-fns';
import { Game } from './Game';
import { createPlaylistMessage } from './messages';

export enum GameState {
  NoGame,
  GameInPlay,
}

export const createHost = (wss: WebSocket.Server) => {
  // setup ticks

  // api to add/start game via manifest.
  const users = new Set<User>();

  const playlist: GamePreview[] = [];
  let game: null | Game = null;

  const broadcast = (message: ServerSent) => {
    console.log(`[broadcast]`, message);

    users.forEach((user) => {
      user.send(message);
    });
  };

  const createUser = (client: WebSocket): User => {
    const data: UserState = {
      authorised: false,
      mobileNumber: null,
      client,
    };

    const send = (message: ServerSent) => {
      client.send(JSON.stringify(message));
    };

    const user = {
      send,
      data,
    };

    const ingress = (data: ClientSent) => {
      if (data.type === ClientType.Answer) {
        if (game !== null) {
          game.forwardAnswerForUser(user, data.data);
        }
      }
    };

    client.on('message', function incoming(message) {
      const data = JSON.parse(message.toString());

      ingress(data);
    });

    send(createPlaylistMessage(playlist));

    return user;
  };

  wss.on('connection', function connection(ws) {
    users.add(createUser(ws));

    console.log('new player connected!');
  });

  const checkForGameStart = () => {
    if (isAfter(addSeconds(new Date(), 10), new Date(playlist[0].startTime))) {
      game = new Game(
        playlist.shift() as GameManifest,
        Array.from(users.values()),
      );
    }
  };

  let tick = 1;

  setInterval(() => {
    broadcast({ type: ServerType.Tick, count: tick++ });

    if (game === null) {
      checkForGameStart();
    } else {
      if (game.hasEnded) {
        game = null;
      }
    }
  }, 1000);

  return {
    addGame(game: GamePreview) {
      playlist.push(game);
      playlist.sort(
        (gameA, gameB) =>
          new Date(gameA.startTime).getTime() -
          new Date(gameB.startTime).getTime(),
      );
      broadcast(createPlaylistMessage(playlist));
    },
  };
};
