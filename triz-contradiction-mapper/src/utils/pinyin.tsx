import React from 'react';
import { pinyinDict, wordPinyinOverrides } from '../data/pinyinData';

interface RubyTextProps {
  text: string;
  lang: 'en' | 'zh';
  className?: string;
}

// Regex matching Chinese characters range \u4e00-\u9fa5
const CHINESE_CHAR_REGEX = /[\u4e00-\u9fa5]/;

export const RubyText: React.FC<RubyTextProps> = ({ text, lang, className = "" }) => {
  if (lang !== 'zh' || !text) {
    return <span className={className}>{text}</span>;
  }

  // Check if entire text string matches a predefined multi-character word override
  if (wordPinyinOverrides[text]) {
    const pinyinWords = wordPinyinOverrides[text].split(" ");
    const chars = Array.from(text);
    if (pinyinWords.length === chars.length) {
      return (
        <span className={`inline-flex flex-wrap items-baseline gap-x-0.5 ${className}`}>
          {chars.map((ch, idx) => (
            <ruby key={`rw-${idx}`} className="ruby-container">
              <span>{ch}</span>
              <rt>{pinyinWords[idx]}</rt>
            </ruby>
          ))}
        </span>
      );
    }
  }

  // Fallback: character-by-character parsing
  const elements: React.ReactNode[] = [];
  const chars = Array.from(text);

  chars.forEach((char, idx) => {
    if (CHINESE_CHAR_REGEX.test(char)) {
      const pinyin = pinyinDict[char] || "";
      elements.push(
        <ruby key={`c-${idx}`} className="ruby-container">
          <span>{char}</span>
          {pinyin && <rt>{pinyin}</rt>}
        </ruby>
      );
    } else {
      elements.push(<span key={`s-${idx}`}>{char}</span>);
    }
  });

  return <span className={className}>{elements}</span>;
};

export function getPinyinForText(text: string): string {
  if (wordPinyinOverrides[text]) {
    return wordPinyinOverrides[text];
  }
  return Array.from(text)
    .map(ch => pinyinDict[ch] || ch)
    .join(" ");
}
