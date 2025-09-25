export interface CodeLine {
  code: string;
  description: string;
}
export const pythonBasics: CodeLine[] = [
  {
    code: "def greet(name):",
    description: "nameを受け取るgreet関数を定義します。",
  },
  {
    code: "    message = f'こんにちは、{name}さん'",
    description: "f文字列であいさつ文を組み立てています。",
  },
  {
    code: "    print(message)",
    description: "生成したメッセージを表示します。",
  },
  {
    code: "\n",
    description: "改行",
  },
  {
    code: "numbers = [1, 2, 3, 4, 5]",
    description: "処理対象となる整数のリストを作成します。",
  },
  {
    code: "total = 0",
    description: "合計値を格納する変数を初期化します。",
  },
  {
    code: "",
    description: "",
  },
  {
    code: "for number in numbers:",
    description: "numbersの各要素を順番に取り出すfor文を開始します。",
  },
  {
    code: "    total += number",
    description: "取り出した値をtotalに加算していきます。",
  },
  {
    code: "",
    description: "",
  },
  {
    code: "if total > 10:",
    description: "合計値が10を超えているかどうかを判定します。",
  },
  {
    code: "    print('合計は10を超えました')",
    description: "条件が真のときのメッセージを表示します。",
  },
  {
    code: "else:",
    description: "条件が偽の場合の処理を用意します。",
  },
  {
    code: "    print('合計は10以下です')",
    description: "条件が偽の場合に表示するメッセージです。",
  },
  {
    code: "",
    description: "",
  },
  {
    code: "greet('太郎')",
    description: "定義したgreet関数を呼び出して挨拶します。",
  },
  {
    code: "print(f'合計値: {total}')",
    description: "計算した合計値を表示します。",
  },
];