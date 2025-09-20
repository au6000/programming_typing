'use client'
import { pytorchCode } from './data';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {TypingProblem ,TypingDisplay} from "./test";
import { ChevronRightIcon } from "lucide-react"

export default function Home() {
  const [typingProblem, setTypingProblem] = useState<TypingProblem>({
    text: pytorchCode[0],
    currentIndex: 0
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [inputText, setInputText] = useState("");
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setInputText(currentValue);
    setTypingProblem(TypingDisplay(typingProblem ,currentValue));
    setIsButtonDisabled(currentValue !== typingProblem.text);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText === typingProblem.text) {
        setCompletedTexts([...completedTexts, inputText]);
        setInputText("");
        setIsButtonDisabled(true);
        setCurrentProblemIndex(currentProblemIndex + 1 )
    setTypingProblem({ text: pytorchCode[currentProblemIndex], currentIndex: 0 });
  };}

return (
    <main className="flex flex-col h-screen p-4 sm:p-8 bg-background">
      
      {/* --- ヘッダー --- */}
      <div className=" mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Code Fragment</h1>
        <p className="text-muted-foreground mt-2">
          指定されたコードをタイピングして完成させましょう。
        </p>
      </div>

      {/* --- メインの2分割エリア (高さを画面いっぱいに変更) --- */}
      <div className="flex flex-1 w-full rounded-lg border shadow-lg">
        <div className="flex-1 p-6 flex items-center justify-center">
          <Card className="w-full  max-w-xl ">
            <CardHeader>
              <div className="font-mono text-lg p-2 rounded-md bg-muted  whitespace-pre-wrap">
                {typingProblem.text.split("").map((char, index) => (
                  <span
                    key={index}
                    style={{ color: index < typingProblem.currentIndex ? "#22c55e" : "#a1a1aa" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit}>
                <div className="flex w-full items-center gap-2">
                  <Input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="ここにコードを入力..."
                    autoFocus
                    className="font-mono"
                  />
                  <Button type="submit" variant="outline" size="icon" disabled={isButtonDisabled}>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
          <Separator orientation="vertical" />
        <div className="flex-1 p-6 h-full overflow-y-auto">
          <div className="flex flex-col">
            {completedTexts.map((text, index) => (
                  <p key={index} className="font-mono text-sm text-secondary-foreground">{text}</p>
            ))}
          </div>
        </div>




        
      </div>
    </main>
  );
}