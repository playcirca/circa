import {
  GamePreview,
  ServerGamePlaylist, ServerPreGameCountdown, ServerQuestionClosed, ServerQuestionCountdown,
  ServerQuestionGiven, ServerQuestionOpen,
  ServerType
} from "../../pipe/src/messages";
import {Question} from "./types";

export function createPlaylistMessage(playlist: GamePreview[]): ServerGamePlaylist {
  return {
    type: ServerType.GamePlaylist,
    playlist,
  }
}

export function createQuestionGivenMessage(question: Question): ServerQuestionGiven {
  return {
    type: ServerType.QuestionGiven,
    question: {
      type: question.type,
      question: question.question,
      data: {}
    },
  }
}

export function createQuestionOpenMessage(): ServerQuestionOpen {
  return {
    type: ServerType.QuestionOpen,
  }
}

export function createQuestionClosedMessage(): ServerQuestionClosed {
  return {
    type: ServerType.QuestionClosed,
  }
}

export const createPregameCountdownMessage = (current: number, total: number): ServerPreGameCountdown => {
  return {
    type: ServerType.PreGameCountdown,
    current,
    count: total
  }
};

export const createQuestionCountdownMessage = (current: number, total: number): ServerQuestionCountdown => {
  return {
    type: ServerType.QuestionCountdown,
    current,
    count: total
  }
};
