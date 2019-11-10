import { QuestionType } from './types';
import {
  createPregameCountdownMessage,
  createQuestionClosedMessage,
  createQuestionCountdownMessage,
  createQuestionGivenMessage,
  createQuestionOpenMessage,
} from './messages';
import { Game } from './Game';

function* sendForTicks(count: number, fn: any) {
  for (let c = 0; c <= count; c++) {
    yield broadcast(fn(c, count));
    yield consumeTicks(1);
  }
}

function consumeTicks(count: number) {
  return { type: 'consume', count };
}

function broadcast(message: any) {
  return { type: 'broadcast', message };
}

function calculateFactsAndSend() {
  return { type: 'qfacts' };
}

function calculateFinalAndSend() {
  return { type: 'final' };
}

export function* createTimingInstance(questions: QuestionType[]) {
  yield* sendForTicks(20, createPregameCountdownMessage);
  for (const question of questions) {
    yield { type: 'nextquestion', question: question };
    yield consumeTicks(2);
    yield { type: 'questionopen' };
    yield* sendForTicks(18, createQuestionCountdownMessage);
    yield { type: 'questionclosed' };
    yield consumeTicks(1);
    yield { type: 'setclosed' };
    yield calculateFactsAndSend();
    yield consumeTicks(6);
  }

  yield calculateFinalAndSend();
}

export function gameRunner(instance: Generator, gameInstance: Game) {
  let current = instance.next();
  let waitFor = 0;
  let running: boolean = false;

  const closeInternal = setInterval(() => {
    waitFor = waitFor - 1;
    if (!running && waitFor <= 0) {
      runNext();
    }
  }, 500);

  function runNext() {
    running = true;

    if (current.done) {
      clearInterval(closeInternal);
      throw new Error('finished');
    }

    while (!current.done && running === true) {
      console.log(current.value);
      const { value } = current as any;

      if (value.type === 'consume') {
        waitFor = value.count;
        running = false;
      }

      if (value.type === 'broadcast') {
        gameInstance.broadcast(value.message);
      }

      if (value.type === 'nextquestion') {
        gameInstance.setQuestion(value.question);
        gameInstance.broadcast(
          createQuestionGivenMessage(
            gameInstance.currentQuestion as QuestionType,
          ),
        );
      }

      if (value.type === 'questionopen') {
        gameInstance.setAnswersAccepting(true);
        gameInstance.broadcast(createQuestionOpenMessage());
      }

      if (value.type === 'questionclosed') {
        gameInstance.broadcast(createQuestionClosedMessage());
      }

      if (value.type === 'setclosed') {
        gameInstance.setAnswersAccepting(false);
      }

      if (value.type === 'qfacts') {
        gameInstance.broadcastFactsForQuestion();
      }

      if (value.type === 'final') {
        gameInstance.final();
      }

      current = instance.next();
    }
  }
}
