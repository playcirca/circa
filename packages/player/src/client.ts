import produce from "immer";
import {GamePreview, ServerSent, ServerType} from "../../pipe/src/messages";

export interface Client {
  on(event: string, fn: () => void): void;
  getState(): State;
}

enum ScreenState {
  GameQueued,
  GamePrelude,
  QuestionGiven,
  QuestionOpen,
  QuestionClosed,
  QuestionAnswer,
  EndGame,
}

interface GameQueuedState {
  state: ScreenState.GameQueued;
  target: string;
}

type CurrentState = GameQueuedState

interface State {
  loading: boolean;
  authToken: null | string;
  current: CurrentState | null;
  serverTick: number;
  playlists: GamePreview[];
}

type PState = ((draft: State) => void) | undefined;

export function createClient(): Client {
  const ws = new WebSocket('ws://28c2eb76.ngrok.io');

  let data: State = {
    loading: true,
    authToken: null,

    current: null,
    serverTick: 0,
    playlists: []
  };


  const ingress = (data: ServerSent ): PState => { // todo
    console.log(`[event] ${data.type}`);
    switch (data.type) {
      case ServerType.AuthSuccess: {
        return draft => {
          draft.authToken = data.jwt;
        }
      }
               case ServerType.Tick: {
        return draft => {
          draft.serverTick = data.count;
        }}
      case ServerType.GamePlaylist: {
        return draft => {
          draft.playlists = data.playlist;
        }
      }
    }
  };

  let listener = () => {};

  ws.addEventListener('message', (e) => {
    const p = ingress(JSON.parse(e.data));
    if (typeof p === "function") {
      data = produce(data, p) as any;
    }
    listener();
  });

  return {
    on(_event, fn) {
      listener = fn;
    },
    getState() {
      return data;
    }
  }
}
