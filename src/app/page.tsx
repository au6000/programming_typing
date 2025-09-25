'use client'
import { pythonBasics } from "./data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { TypingProblem, TypingDisplay } from "./test";
import { ChevronRightIcon } from "lucide-react";
import CodeBlock from './CodeBlock'


export default function Home() {
  const initialProblem = pythonBasics[0] ?? { code: "", description: "" };
  const [typingProblem, setTypingProblem] = useState<TypingProblem>({
    text: initialProblem.code,
    description: initialProblem.description,
    currentIndex: 0,
  });
  const [inputText, setInputText] = useState("");
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const currentValue = e.target.value;
    setInputText(currentValue);
    setTypingProblem(TypingDisplay(typingProblem, currentValue));
    if (currentValue === typingProblem.text) {
      const nextIndex = currentProblemIndex + 1;
      const nextProblem = pythonBasics[nextIndex] ?? { code: "", description: "" };
      setCompletedTexts([...completedTexts, currentValue]);
      setInputText("");
      setCurrentProblemIndex(nextIndex);
      setTypingProblem({
        text: nextProblem.code,
        description: nextProblem.description,
        currentIndex: 0,
      });
    }
  };
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
            <CardHeader className="space-y-4">
              {typingProblem.description && (
                <p className="text-sm text-muted-foreground">{typingProblem.description}</p>
              )}
              <div className="font-mono text-lg p-2 rounded-md bg-muted  whitespace-pre-wrap">
                {typingProblem.text.split("").map((char, index) => {
                    // 💡 改行文字の場合は <br> タグを返す
                    if (char === '\n') {
                      return <br key={index} />;
                    }
                    
                    // それ以外の文字は今まで通り <span> で表示
                    return (
                      <span
                        key={index}
                        style={{
                          color: index < typingProblem.currentIndex ? "#22c55e" : "#a1a1aa",
                          backgroundColor: char === ' ' 
                            ? (index < typingProblem.currentIndex ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)') 
                            : 'transparent'
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    );
                  })}
              </div>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center gap-2">
                  <Textarea
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="ここにコードを入力..."
                    autoFocus
                    className="font-mono"
                  />
                </div>
            </CardContent>
          </Card>
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1 p-6 h-full overflow-y-auto">
          <div className="flex flex-col">
            {completedTexts.map((text, index) => (
             <CodeBlock
                key={index}
                code={text}
                lang="python"
        />
      ))}
          </div>
        </div>
      </div>
    </main>
  );
}