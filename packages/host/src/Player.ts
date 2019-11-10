import { Answer, Question, User } from './types';

export class Player {
  private questionAnswers = new Map<Question, Answer[]>();
  public user: User;

  constructor(user: User) {
    this.user = user;
  }

  saveAnswer(question: Question, answer: Answer) {
    const answers = this.questionAnswers.get(question);
    if (answers) {
      answers.push(answer);
    } else {
      this.questionAnswers.set(question, []);
      this.saveAnswer(question, answer);
    }

    console.log(this.questionAnswers);
  }

  getFinalAnswerForQuestion(question: Question) {
    const answers = this.questionAnswers.get(question);

    if (answers && answers.length > 0) {
      return answers[answers.length - 1];
    }

    return null;
  }
}
