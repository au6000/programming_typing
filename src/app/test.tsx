import { zip } from 'zip-ts';

export interface TypingProblem {
  text: string;
  description: string;
  currentIndex: number;
}

export function TypingDisplay(problem: TypingProblem, inputtext: string): TypingProblem {
  let current = 0;
  for (const [a, b] of zip(problem.text, inputtext)) {
    if (a === b) {
      current += 1;
    } else {
      break;
    }
  }
  return { ...problem, currentIndex: current };
}