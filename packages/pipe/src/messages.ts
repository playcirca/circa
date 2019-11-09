
export enum ClientType {
  StartAuth,
  ValidateCode
}

export enum ServerType {
  SentValidation,
  AuthSuccess,
  GamePlaylist,
  Tick
}

export interface GamePreview {
  name: string;
  startTime: string;
}

export interface ClientStartAuth {
  type: ClientType.StartAuth;
  number: string;
}

export interface ClientValidateCode {
  type: ClientType.ValidateCode;
  code: number;
}

export interface ServerGamePlaylist {
  type: ServerType.GamePlaylist;
  games: GamePreview
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

export type ClientSent = ClientStartAuth | ClientValidateCode;


export type ServerSent = ServerSentValidation | ServerAuthSuccessful | ServerGamePlaylist | ServerTick;
