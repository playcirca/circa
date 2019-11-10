import { QuestionType } from '@circa/host/src/types';

export enum ClientType {
  StartAuth = 'STARTAUTH',
  ValidateCode = 'VALIDATECODE',
  Answer = 'ANSWER',
}

export enum ServerType {
  SentValidation = 'SentValidation',
  AuthSuccess = 'AuthSuccess',
  GamePlaylist = 'GamePlaylist',
  Tick = 'Tick',
  PreGameCountdown = 'PreGameCountdown',
  QuestionGiven = 'QuestionGiven',
  QuestionOpen = 'QuestionOpen',
  QuestionClosed = 'QuestionClosed',
  QuestionAnswer = 'QuestionAnswer',
  QuestionFacts = 'QuestionFacts',
  QuestionCountdown = 'QuestionCountdown',
  GameFinished = 'GameFinished',
}

export interface GamePreview {
  name: string;
  startTime: string;
}

export interface ClientStartAuth {
  type: ClientType.StartAuth;
  number: string;
}

export interface ClientAnswer {
  type: ClientType.Answer;
  data: any;
}

export interface ClientValidateCode {
  type: ClientType.ValidateCode;
  code: number;
}

export interface ServerGamePlaylist {
  type: ServerType.GamePlaylist;
  playlist: GamePreview[];
}

export interface ServerSentValidation {
  type: ServerType.SentValidation;
}

export interface ServerAuthSuccessful {
  type: ServerType.AuthSuccess;
  jwt: string;
}

export interface ServerTick {
  type: ServerType.Tick;
  count: number;
}

export interface ServerPreGameCountdown {
  type: ServerType.PreGameCountdown;
  current: number;
  count: number;
}
export interface ServerQuestionCountdown {
  type: ServerType.QuestionCountdown;
  current: number;
  count: number;
}

export interface ServerQuestionGiven {
  type: ServerType.QuestionGiven;
  question: QuestionType;
}

export interface ServerQuestionOpen {
  type: ServerType.QuestionOpen;
}

export interface ServerQuestionClosed {
  type: ServerType.QuestionClosed;
}

export interface ServerQuestionAnswer {
  type: ServerType.QuestionAnswer;
  data: any;
}

export interface ServerQuestionFacts {
  type: ServerType.QuestionFacts;
  fact: string;
}

export interface ServerGameFinished {
  type: ServerType.GameFinished;
}

export type ClientSent = ClientStartAuth | ClientValidateCode | ClientAnswer;

export type ServerSent =
  | ServerSentValidation
  | ServerAuthSuccessful
  | ServerGamePlaylist
  | ServerTick
  | ServerQuestionGiven
  | ServerQuestionOpen
  | ServerQuestionClosed
  | ServerQuestionAnswer
  | ServerQuestionFacts
  | ServerPreGameCountdown
  | ServerQuestionCountdown
  | ServerGameFinished;
