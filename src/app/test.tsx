import { zip } from 'zip-ts';

export interface TypingProblem {
  text: string;
  currentIndex: number;
}

export function TypingDisplay({ text, currentIndex }: TypingProblem, inputtext : string){
    
    const test_list = text.split("")
    const inputtext_list = inputtext.split("")
    let current = 0
    for (const [a, b] of zip(text, inputtext)) {
        if (a === b) {
            current += 1   
        }   else {
            break
        }
    }
    return {text: text, currentIndex: current}
}