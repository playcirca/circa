import WebSocket from "ws";
import {GamePreview, ServerSent} from "../../pipe/src/messages";

export interface UserState {
  authorised: boolean;
  mobileNumber: string | null;
  client: WebSocket
}

export interface User {
  send(message: ServerSent): void;
  data: UserState;
}


export interface Question {
  type: string;
  question: string;
  answer: number;
}

export interface RangeQuestionType extends Question {
  range: {
    from: number;
    to: number;
    step: number;
  }
  unit: string;
}

export type QuestionType = RangeQuestionType;

export type Answer = any;

export interface GameManifest extends GamePreview {
  questions: QuestionType[];
}
