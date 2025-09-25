// app/components/CodeBlock.jsx
'use client';

import { codeToHtml } from 'shiki';
import { useState, useEffect } from 'react';

export default function CodeBlock({ code, lang }) {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [error, setError] = useState(null); // エラーを保存するstateを追加

  useEffect(() => {
    // 以前のハイライト結果をリセット
    setHighlightedCode('');
    setError(null);

    const highlight = async () => {
      try { // 👈 tryブロックでエラーを監視
        const html = await codeToHtml(code, {
          lang: lang,
          theme: 'github-light',
          getWasm: (type) => import('shiki/wasm')
        });
        setHighlightedCode(html);
      } catch (e) { // 👈 catchブロックでエラーを捕捉
        console.error("Shiki highlighting failed:", e); // コンソールにエラーを出力
        setError(e.message); // エラーメッセージをstateに保存
      }
    };

    if (code) {
      highlight();
    }
  }, [code, lang]);

  // エラーが発生した場合の表示
  if (error) {
    return (
      <pre className="shiki github-light" style={{ color: 'red', padding: '1em', backgroundColor: '#FFFFFF' }}>
        <code>Error highlighting code: {error}</code>
      </pre>
    );
  }

  // ハイライト処理中は一時的に生のコードを表示
  if (!highlightedCode) {
    return (
      <pre className="shiki github-light" style={{ padding: '1em', backgroundColor: '#FFFFFF' }}>
        <code>{code}</code>
      </pre>
    );
  }

  // 正常に生成されたHTMLを表示
  return <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
}