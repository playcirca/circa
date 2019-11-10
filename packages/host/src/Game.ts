import {GameManifest, Question, QuestionType, User} from "./types";
import {Player} from "./Player";
import {createTimingInstance, gameRunner} from "./logic";
import {ServerSent, ServerType} from "../../pipe/src/messages";


export class Game {

  public hasEnded = false;
  private manifest: GameManifest;
  private players: Map<User, Player>;
  public currentQuestion: Question | null = null;
  public acceptingAnswers = false;

  constructor(manifest: GameManifest, users: User[]) {
    this.manifest = manifest;
    this.players = new Map<User, Player>();

    users.forEach(user => this.players.set(user, new Player(user)));

    gameRunner(createTimingInstance(this.manifest.questions), this);
  }

  forwardAnswerForUser(user: User, answer: any) {
    const player = this.players.get(user);
    if (player && this.currentQuestion && this.acceptingAnswers) {
      player.saveAnswer(this.currentQuestion, answer);
    }
  }

  setQuestion(question: Question) {
    this.currentQuestion = question;
  }

  setAnswersAccepting(accepting: boolean) {
    this.acceptingAnswers = accepting;
  }

  broadcastFactsForQuestion() {
    if (this.currentQuestion === null) {
      return;
    }

    const questionScore: [Player, number][] = [];

    const answerValue = (this.currentQuestion as any).answer;

    this.players.forEach(player => {
      const finalAnswer = player.getFinalAnswerForQuestion(this.currentQuestion as QuestionType);

      if (finalAnswer === null) {
        questionScore.push([player, 0])

        return
      }


      questionScore.push([player, Math.abs(finalAnswer - answerValue)/answerValue])
    });

    questionScore.sort((a, b) => a[1] - b[1]);

    console.log(questionScore);

    questionScore.forEach(([player, score], index) => {
      player.user.send({ type: ServerType.QuestionFacts, fact: `You were ${(score * 100).toFixed(2)}% off!` })
      player.user.send({ type: ServerType.QuestionFacts, fact: `You ranked ${index + 1} for this question.` })
    })

    // get final answer for each player
    // calc percent diff
    // add points to leaderboard

    // order

  }

  broadcast(message: ServerSent) {
    Array.from(this.players.keys()).forEach(user => user.send(message));
  }
}

