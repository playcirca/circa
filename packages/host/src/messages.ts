import {
  GamePreview,
  ServerGamePlaylist,
  ServerQuestionGiven,
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
      question: 'hello',
      data: {}
    },
  }
}
