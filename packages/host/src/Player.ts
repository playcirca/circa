import {Answer, Question, User} from "./types";

export class Player {
  private user: User;

  private questionAnswers = new Map<Question, Answer[]>();

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
  }
}
