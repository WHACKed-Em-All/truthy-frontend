"use client";

import { Button } from "@/components/ui/button";
import { FC, useState, KeyboardEvent, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface QueryBarProps {
  handleSubmit: (query: string) => void;
}

const QueryBar: FC<QueryBarProps> = ({ handleSubmit }: QueryBarProps) => {
  const [query, setQuery] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitClick = (): void => {
    if (query.trim()) {
      handleSubmit(query);
      setQuery("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitClick();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  return (
    <div className="relative mx-auto">
      <div className="relative flex items-end bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-3xl shadow-lg min-h-[52px]">
        <textarea
          ref={textareaRef}
          placeholder="Enter your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 px-4 py-3 pr-12 bg-transparent border-0 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none rounded-3xl max-h-32 overflow-y-auto"
          style={{ minHeight: "44px" }}
        />
        <Button
          onClick={handleSubmitClick}
          disabled={!query.trim()}
          size="sm"
          className="absolute right-2 bottom-2 h-8 w-8 rounded-full p-0 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          variant="ghost"
        >
          <Send className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>
    </div>
  );
};

export default QueryBar;
