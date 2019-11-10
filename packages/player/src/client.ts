import produce from "immer";
import {
  ClientAnswer,
  ClientSent,
  ClientType,
  GamePreview,
  ServerSent,
  ServerType
} from "../../pipe/src/messages";
import {ClientQuestion} from "../../pipe/src/question";
import NanoEvents from 'nanoevents'

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
}

interface GameQueuedState {
  state: ScreenState.GameQueued;
  target: string;
}

interface QuestionGivenState {
  state: ScreenState.QuestionGiven;
  question: ClientQuestion;
}

interface QuestionOpenState {
  state: ScreenState.QuestionOpen;
  question: ClientQuestion;
}

interface QuestionClosedState {
  state: ScreenState.QuestionClosed;
  question: ClientQuestion;
}

interface QuestionAnswerState {
  state: ScreenState.QuestionAnswer;
  question: ClientQuestion;
}

type CurrentState = GameQueuedState | QuestionGivenState | QuestionOpenState | QuestionClosedState | QuestionAnswerState;

export interface State {
  loading: boolean;
  authToken: null | string;
  current: CurrentState | null;
  serverTick: number;
  playlists: GamePreview[];
  facts: string[]
}

type PState = ((draft: State) => void) | undefined;

export function createClient(): Client {
  const ws = new WebSocket('ws://localhost:8009');

  const emitter = new NanoEvents<{
    change: null,
  }>();

  let data: State = {
    loading: true,
    authToken: null,

    current: null,
    serverTick: 0,
    playlists: [],
    facts: []
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
          }
        }
        case ServerType.QuestionClosed: {
          return draft => {
            //@ts-ignore
            draft.current.state = ScreenState.QuestionClosed;
          }
        }
        case ServerType.QuestionAnswer: {
          return draft => {
            //@ts-ignore
            draft.current.state = ScreenState.QuestionAnswer;
          }
        }
        case ServerType.QuestionFacts: {
          return draft => {
            //@ts-ignore
            draft.facts.push(data.fact);
          }
        }
      }
    }

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
