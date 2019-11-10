import {
  ClientSent,
  GamePreview,
  ServerSent,
  ServerType
} from "../../pipe/src/messages";
import WebSocket from "ws";
import {GameManifest, User, UserState} from "./types";
import {addMinutes, isAfter} from "date-fns";
import {Game} from "./Game";
import {createPlaylistMessage} from "./messages";

export enum GameState {
  NoGame,
  GameInPlay
}

export const createHost = (wss: WebSocket.Server) => {
  // setup ticks

  // api to add/start game via manifest.
  const users = new Set<User>();

  const playlist: GamePreview[] = [];

  const broadcast = (message: ServerSent) => {
    console.log(`[broadcast]`, message);

    users.forEach((user) => {
      user.send(message);
    })
  };

  const createUser = (client: WebSocket): User => {
    const data: UserState = {
      authorised: false,
      mobileNumber: null,
      client,
    };

    const ingress = (_data: ClientSent) => {

    };


    client.on('message', function incoming(message) {
      const data = JSON.parse(message.toString());

      ingress(data);
    });

    const send = (message: ServerSent) => {
      client.send(JSON.stringify(message));
    };

    send(createPlaylistMessage(playlist));

    return {
      send,
      data
    }
  };

  wss.on('connection', function connection(ws) {
    users.add(createUser(ws));

    console.log('new player connected!');
  });
  let game: null | Game = null;

  const checkForGameStart = () => {
    if (isAfter(addMinutes(new Date(), 1), new Date(playlist[0].startTime))) {
      game = new Game(playlist.shift() as GameManifest, Array.from(users.values()));
    }
  };

  let tick = 1;

  setInterval(() => {
    broadcast({ type: ServerType.Tick, count: tick++ });


    if (game === null) {
      checkForGameStart();
    } else {
      game.tick();

      if (game.hasEnded) {
        game = null;
      }
    }

    }, 1000);


  return {
    addGame(game: GamePreview) {
      playlist.push(game);
      playlist.sort((gameA, gameB) => new Date(gameA.startTime).getTime() - new Date(gameB.startTime).getTime());
      broadcast(createPlaylistMessage(playlist));
    }
  }
};
