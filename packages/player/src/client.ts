import produce from "immer";
import {ServerSent, ServerType} from "../../pipe/src/messages";

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
}

type PState = ((draft: State) => void) | undefined;

export function createClient(): Client {
  const ws = new WebSocket('ws://localhost:8009');

  let data: State = {
    loading: true,
    authToken: null,

    current: null,
  };


  const ingress = (data: ServerSent ): PState => { // todo
    console.log(`[event] ${data.type}`);
    switch (data.type) {
      case ServerType.AuthSuccess:
        return draft => {
          draft.authToken = data.jwt;
        }
    }
  };

  ws.addEventListener('message', (e) => {
    data = produce(data, ingress(JSON.parse(e.data)) as any) as any;
    //emit change
  });

  return {
    on(_event, _fn) {

    },
    getState() {
      return data;
    }
  }
}
