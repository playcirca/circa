import { GameManifest, Question, QuestionType, User } from './types';
import { Player } from './Player';
import { createTimingInstance, gameRunner } from './logic';
import { ServerSent, ServerType } from '../../pipe/src/messages';

export class Game {
  public hasEnded = false;
  private manifest: GameManifest;
  private players: Map<User, Player>;
  public currentQuestion: Question | null = null;
  public acceptingAnswers = false;
  public leaderboard = new Map<Player, number>();

  constructor(manifest: GameManifest, users: User[]) {
    this.manifest = manifest;
    this.players = new Map<User, Player>();

    users.forEach((user) => {
      const player = new Player(user);
      this.players.set(user, player);
      this.leaderboard.set(player, 0);
    });

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

  final() {
    this.broadcast({
      type: ServerType.GameFinished,
    });

    this.players.forEach((player) => {
      player.user.send({
        type: ServerType.QuestionFacts,
        fact: 'Thanks for playing our demo!',
      });
      player.user.send({
        type: ServerType.QuestionFacts,
        fact: '🐛 Bug Avoider Achievement Unlocked',
      });
      player.user.send({
        type: ServerType.QuestionFacts,
        fact: `Total points: ${(
          (this.leaderboard.get(player) || 0) * 10
        ).toFixed(1)}`,
      });
    });
  }

  broadcastFactsForQuestion() {
    if (this.currentQuestion === null) {
      return;
    }

    const questionScore: [Player, number][] = [];

    const answerValue = (this.currentQuestion as any).answer;

    this.players.forEach((player) => {
      const finalAnswer = player.getFinalAnswerForQuestion(
        this.currentQuestion as QuestionType,
      );

      if (finalAnswer === null) {
        questionScore.push([player, 1000000]);

        return;
      }

      const score = Math.abs(
        (finalAnswer - answerValue) / (this.currentQuestion as any).answer,
      );
      questionScore.push([player, score]);
      this.leaderboard.set(player, (this.leaderboard.get(player) || 0) + score);
    });

    questionScore.sort((a, b) => b[1] - a[1]);

    questionScore.forEach(([player, score], index) => {
      player.user.send({
        type: ServerType.QuestionFacts,
        fact: `You were ${(score * 10).toFixed(1)}% off!`,
      });
      player.user.send({
        type: ServerType.QuestionFacts,
        fact: `You ranked ${index + 1} for this question.`,
      });

      player.user.send({
        type: ServerType.QuestionFacts,
        fact: `Current points: ${this.leaderboard.get(player) || 0}`,
      });
    });

    // get final answer for each player
    // calc percent diff
    // add points to leaderboard

    // order
  }

  broadcast(message: ServerSent) {
    Array.from(this.players.keys()).forEach((user) => user.send(message));
  }
}
