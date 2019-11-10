import {GameManifest, Question, User} from "./types";
import {Player} from "./Player";
import {ServerSent} from "../../pipe/src/messages";
import {createQuestionGivenMessage} from "./messages";

enum InternalGameState {
  Started,
  QuestionGiven,
  AnswersAccepted,
  AnswersFinished,
  AnswersFeedback,
  EndOfQuestions,
  FinalResults
}

export class Game {

  public hasEnded = false;
  private manifest: GameManifest;
  private players: Map<User, Player>;
  private currentQuestion: Question | null = null;
  private gameState: InternalGameState = InternalGameState.Started;
  private currentTickCount = 0;

  constructor(manifest: GameManifest, users: User[]) {
    this.manifest = manifest;
    this.players = new Map<User, Player>();

    users.forEach(user => this.players.set(user, new Player(user)));
  }

  broadcastPlayers(message: ServerSent) {
    Array.from(this.players.keys()).forEach(user => user.send(message));
  }


  transformToQuestionGiven() {
    this.gameState = InternalGameState.QuestionGiven;
    this.broadcastPlayers(createQuestionGivenMessage(this.manifest.questions.shift()))
  }

  tick() {
    // has current question?
    // end of question ticks? calculate sync, send
    // tick question forward

    // has more q? send do next, else calc final stats, hasFinished.

    if (this.gameState === InternalGameState.Started) {
      if (this.currentTickCount > 10) {
        this.transformToQuestionGiven()
      }

      return
    }
  }

  forwardAnswerForUser(user: User, answer: any) {
    const player = this.players.get(user);
    if (player && this.currentQuestion) {
      player.saveAnswer(this.currentQuestion, answer);
    }
  }

  // state of game.
  // players != users. map. each question answer.

  // tick for question.
  // end countdown.
  // get final answers
  // do calcuations
  // send responses
  // next question
  // no questions left?
  // show leaderboard.
  // self destroy.
}

