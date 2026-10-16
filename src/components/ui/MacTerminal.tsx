"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ITerminalLine {
  type: "command" | "output" | "success" | "info";
  text: string;
  delay?: number;
}

interface IMacTerminalProps {
  title?: string;
  lines: ITerminalLine[];
  className?: string;
}

export const MacTerminal = ({ title = "Terminal", lines, className = "" }: IMacTerminalProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      const timer = setTimeout(() => setIsTyping(false), 0);
      return () => clearTimeout(timer);
    }

    const currentLine = lines[visibleLines];
    const delay = currentLine.delay || (currentLine.type === "command" ? 50 : 20);

    if (currentText.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.text.slice(0, currentText.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setCurrentText("");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, currentText, lines]);

  const getLineStyle = (type: ITerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-green-400";
      case "success":
        return "text-emerald-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-slate-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mx-auto w-full min-w-0 max-w-2xl ${className}`}
    >
      {/* Terminal Window */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-slate-700/50 shadow-2xl">
        {/* Title Bar */}
        <div className="grid grid-cols-[2.625rem_minmax(0,1fr)_2.625rem] items-center bg-slate-800 px-3 py-2.5 sm:grid-cols-[3.25rem_minmax(0,1fr)_3.25rem] sm:px-4 sm:py-3">
          <div className="flex gap-1.5 sm:gap-2" aria-hidden="true">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500 transition-colors hover:bg-red-600 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 transition-colors hover:bg-green-600 sm:h-3 sm:w-3" />
          </div>
          <div className="min-w-0 px-2 text-center">
            <span className="block truncate text-xs font-medium text-slate-400 sm:text-sm" title={title}>
              {title}
            </span>
          </div>
          <div aria-hidden="true" />
        </div>

        {/* Terminal Content */}
        <div className="min-h-32 min-w-0 overflow-x-auto bg-slate-900 p-3 font-mono text-xs leading-relaxed sm:min-h-36 sm:p-5 sm:text-sm md:min-h-40 md:p-6 md:text-base">
          {lines.slice(0, visibleLines).map((line, index) => (
            <div
              key={index}
              className={`mb-2 min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere] ${getLineStyle(line.type)}`}
            >
              {line.text}
            </div>
          ))}

          {/* Currently typing line */}
          {visibleLines < lines.length && (
            <div
              className={`mb-2 min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere] ${getLineStyle(lines[visibleLines].type)}`}
            >
              {currentText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 inline-block h-[1em] w-[0.55em] bg-slate-300 align-middle"
              />
            </div>
          )}

          {/* Blinking cursor when done */}
          {!isTyping && (
            <div className="text-green-400">
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block h-[1em] w-[0.55em] bg-green-400 align-middle"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
