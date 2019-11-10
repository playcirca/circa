import produce from "immer";
import {
  ClientAnswer,
  ClientSent,
  ClientType,
  GamePreview,
  ServerSent,
  ServerType
} from "../../pipe/src/messages";
import NanoEvents from 'nanoevents'
import {QuestionType} from "@circa/host/src/types";

export interface Client {
  emitter: NanoEvents<{
    change: null,
  }>;
  getState(): State;
  send(message: ClientSent): void;
}

export enum ScreenState {
  GameQueued,
  GamePrelude,
  QuestionGiven,
  QuestionOpen,
  QuestionClosed,
  QuestionAnswer,
  EndGame,
  Finished
}

interface GameQueuedState {
  state: ScreenState.GameQueued;
  target: string;
}

interface QuestionGivenState {
  state: ScreenState.QuestionGiven;
  question: QuestionType;
}

interface QuestionOpenState {
  state: ScreenState.QuestionOpen;
  question: QuestionType;
}

interface QuestionClosedState {
  state: ScreenState.QuestionClosed;
  question: QuestionType;
}

interface QuestionAnswerState {
  state: ScreenState.QuestionAnswer;
  question: QuestionType;
}

interface Finished {
  state: ScreenState.QuestionAnswer;
  question: QuestionType;
}

type CurrentState = GameQueuedState | QuestionGivenState | QuestionOpenState | QuestionClosedState | QuestionAnswerState | Finished;

export interface State {
  loading: boolean;
  authToken: null | string;
  current: CurrentState | null;
  serverTick: number;
  playlists: GamePreview[];
  facts: string[]
  countdown: number;
}

type PState = ((draft: State) => void) | undefined;

export function createClient(): Client {
  const ws = new WebSocket('wss://838a0023.ngrok.io');

  const emitter = new NanoEvents<{
    change: null,
  }>();

  let data: State = {
    loading: true,
    authToken: null,

    current: null,
    serverTick: 0,
    playlists: [],
    facts: [],
    countdown: 0,
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
          if (data.playlist.length > 0) {
            draft.current = { state: ScreenState.GameQueued, target: data.playlist[0].startTime };
          }
        }}
      case ServerType.QuestionGiven: {
          return draft => {
            draft.current = {state: ScreenState.QuestionGiven, question: data.question};
            draft.facts = []
          }
        }
        case ServerType.QuestionOpen: {
          return draft => {
            //@ts-ignore
            draft.current.state = ScreenState.QuestionOpen;

            draft.countdown = 10;
          }
        }
        case ServerType.QuestionClosed: {
          return draft => {
            //@ts-ignore
            draft.current.state = ScreenState.QuestionClosed;
            draft.countdown = 0;
          }
        }
        case ServerType.QuestionAnswer: {
          return draft => {
            //@ts-ignore
            draft.current.state = ScreenState.QuestionAnswer;
          }
        }
        case ServerType.QuestionCountdown: {
          return draft => {
            draft.countdown = 10 - Math.round(data.current / 2) ;
          }
        }

        case ServerType.QuestionFacts: {
          return draft => {
            //@ts-ignore
            draft.facts.push(data.fact);
          }
        }
        case ServerType.GameFinished: {
          return draft => {
            //@ts-ignore
            draft.current = {
              state: ScreenState.Finished
            };
            draft.facts = [];
          }
        }
      }
    };

  ws.addEventListener('message', (e) => {
    const p = ingress(JSON.parse(e.data));
    if (typeof p === "function") {
      data = produce(data, p) as any;
    }
    emitter.emit('change', null);
  });

  return {
    emitter,
    getState() {
      return data;
    },
    send(message) {
      ws.send(JSON.stringify(message));
    }
  }
}

export const createClientRangeAnswer = (e: any): ClientAnswer => {
  return {
    type: ClientType.Answer,
    data: parseFloat(e.target.value),
  }
};
