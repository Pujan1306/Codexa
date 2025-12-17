import React, { useEffect, useRef, useState } from "react";
import { Settings, Play, Code2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import { cn } from "@/lib/utils";
import type { ExecutionResult } from "@/types/problems";
import { executeCodeApi } from "@/api/executeCode";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface CodeWorkspaceProps {
  language: "javascript" | "python" | "java";
  setLanguage: (lang: "javascript" | "python" | "java") => void;
  code: string;
  setCode: (code: string) => void;
  onSuccess?: (success: boolean) => void;
  className?: string;
}

export const CodeWorkspace = ({
  language,
  setLanguage,
  code,
  setCode,
  onSuccess,
  className,
}: CodeWorkspaceProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Cursor state
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [charWidth, setCharWidth] = useState(8.4); // Approximation
  const [lineHeight, setLineHeight] = useState(24);

  // Measure font metrics on mount/resize
  useEffect(() => {
    if (measureRef.current) {
      const rect = measureRef.current.getBoundingClientRect();
      setCharWidth(rect.width);
      setLineHeight(rect.height);
    }
  }, [language]); 

  const updateCursor = () => {
    if (!textareaRef.current) return;
    const { selectionStart, value, scrollTop, scrollLeft } = textareaRef.current;
    
    // Calculate cursor position
    const textBeforeCaret = value.substring(0, selectionStart);
    const lines = textBeforeCaret.split('\n');
    const lineIndex = lines.length - 1;
    const currentLine = lines[lineIndex];

    // Handle tabs: assume tab-size: 2 (matching CSS)
    // We replace tabs with 2 spaces for the calculation of visual width
    const visualLineLength = currentLine.replace(/\t/g, '  ').length;
    
    // Offsets based on layout:
    // left-12 (3rem = 48px) + p-4 (1rem = 16px) = 64px total left offset
    // p-4 (1rem = 16px) = 16px total top offset
    const startLeft = 64;
    const startTop = 16;
    
    const x = startLeft + (visualLineLength * charWidth) - scrollLeft;
    const y = startTop + (lineIndex * lineHeight) - scrollTop;
    
    setCursorCoords({ x, y });
  };

  // Sync scroll between textarea, pre, and line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
    updateCursor();
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    requestAnimationFrame(updateCursor);
  };
  
  // Handle keys for indentation and cursor movement
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { selectionStart, selectionEnd, value } = e.currentTarget;

    if (e.key === 'Tab') {
      e.preventDefault();
      const spaces = '  '; // 2 spaces
      
      const newCode = value.substring(0, selectionStart) + spaces + value.substring(selectionEnd);
      setCode(newCode);
      
      // Move caret
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + spaces.length;
          textareaRef.current.selectionEnd = selectionStart + spaces.length;
          updateCursor();
        }
      });
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Get the current line up to the cursor
      const currentLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = value.substring(currentLineStart, selectionStart);
      
      // Calculate current indentation
      const match = currentLine.match(/^(\s*)/);
      let indent = match ? match[1] : '';
      
      // Smart indent: Check if line ends with block opener
      const trimmedLine = currentLine.trimEnd();
      const isBlockOpener = 
        (language === 'python' && trimmedLine.endsWith(':')) || 
        ((language === 'javascript' || language === 'java') && trimmedLine.endsWith('{'));
      
      if (isBlockOpener) {
        indent += '  ';
      }

      const newCode = value.substring(0, selectionStart) + '\n' + indent + value.substring(selectionEnd);
      setCode(newCode);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + 1 + indent.length;
          textareaRef.current.selectionEnd = selectionStart + 1 + indent.length;
          updateCursor();
        }
      });
      return;
    }
    
    // Update cursor for navigation keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      requestAnimationFrame(updateCursor);
    }
  };

  const handleKeyUp = () => {
    updateCursor();
  };

  const handleRunCode = async () => {
    if (!code.trim()) return;
    
    setIsRunning(true);
    setResult(null);
    if (onSuccess) onSuccess(false);
  
    try {
      const response = await executeCodeApi.execute(language, code);
  
      if (response.success) {
        setResult({
          success: true,
          output: response.output || "Code executed successfully (no output)"
        });
        if (onSuccess) onSuccess(true);
      } else {
        setResult({
          success: false,
          error: response.error || "Execution failed",
          output: response.output
        });
        if (onSuccess) onSuccess(false);
      }
    } catch (error: any) {
      console.error("Error executing code:", error);
      setResult({
        success: false,
        error: error.message || "Failed to execute code. Please try again."
      });
      if (onSuccess) onSuccess(false);
    } finally {
      setIsRunning(false);
    }
  };

  // Prepare output string for the workspace component
  const outputString = result 
    ? (result.error ? result.error : result.output || "")
    : null;

  // Generate line numbers based on code length
  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 20) }, (_, i) => i + 1);

  // Syntax highlighting
  const highlightedCode = React.useMemo(() => {
    const grammar = Prism.languages[language] || Prism.languages.javascript;
    return grammar ? Prism.highlight(code, grammar, language) : code;
  }, [code, language]);

  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden rounded-xl border border-[#1f1f1f] bg-[#000000] backdrop-blur-sm shadow-xl", className)}>
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-[#1f1f1f] bg-[#0a0a0a] px-4 py-2 shrink-0">
        <div className="flex items-center gap-2">
          <Select
            value={language}
            onValueChange={(val: any) => setLanguage(val)}
          >
            <SelectTrigger className="w-[140px] bg-[#1a1a1a] border-[#1f1f1f] text-white focus:ring-primary/50 h-8">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning}
            className="h-8 bg-[#f97316] hover:bg-[#f97316]/90 text-white font-medium gap-1.5 px-4 rounded-md shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current" />
            )}
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      <PanelGroup direction="vertical">
        {/* Main Content Area: Editor */}
        <Panel defaultSize={70} minSize={30}>
            <div className="h-full relative flex flex-col min-h-0 bg-[#000000]">
                {/* Editor Container - Flex 1 to take available space */}
                <div className="flex-1 relative font-mono text-sm overflow-hidden group min-h-0 cursor-text" onClick={() => textareaRef.current?.focus()}>
                
                {/* Hidden Span for Measurement */}
                <span 
                    ref={measureRef} 
                    className="absolute opacity-0 pointer-events-none whitespace-pre font-mono text-sm leading-6"
                    aria-hidden="true"
                >
                    M
                </span>

                {/* Line Numbers */}
                <div 
                    ref={lineNumbersRef}
                    className="absolute left-0 top-0 bottom-0 w-12 bg-[#000000] border-r border-[#1f1f1f] pt-4 flex flex-col items-center text-[#6e7681] select-none overflow-hidden z-10"
                >
                    {lineNumbers.map((num) => (
                    <div key={num} className="h-6 text-xs leading-6 opacity-50">
                        {num}
                    </div>
                    ))}
                </div>

                {/* Syntax Highlighted Code (Background) */}
                <pre
                    ref={preRef}
                    aria-hidden="true"
                    className={cn(
                    "absolute inset-0 left-12 w-[calc(100%-3rem)] h-full p-4 pointer-events-none overflow-hidden m-0 bg-transparent",
                    `language-${language}`
                    )}
                    style={{ fontFamily: 'inherit' }}
                >
                    <code 
                    className={`language-${language}`}
                    style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '14px', lineHeight: '1.5rem', whiteSpace: 'pre' }}
                    dangerouslySetInnerHTML={{ __html: (highlightedCode || "") + '<br />' }}
                    />
                </pre>

                {/* Textarea (Foreground, transparent) */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleCodeChange}
                    onScroll={handleScroll}
                    onSelect={updateCursor}
                    onClick={updateCursor}
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="absolute inset-0 left-12 w-[calc(100%-3rem)] h-full bg-transparent p-4 resize-none focus:outline-none text-transparent leading-6 scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent selection:bg-[#333333] z-20"
                    style={{ 
                    fontFamily: '"IBM Plex Mono", monospace', 
                    fontSize: '14px', 
                    lineHeight: '1.5rem',
                    whiteSpace: 'pre',
                    caretColor: 'transparent', // Hide native caret
                    }}
                    spellCheck="false"
                />

                {/* Custom "You" Cursor - Orange #f97316 */}
                {isFocused && (
                    <div 
                    className="absolute w-[2px] h-6 bg-[#f97316] z-30 pointer-events-none animate-pulse"
                    style={{ 
                        left: cursorCoords.x, 
                        top: cursorCoords.y,
                        // Hide cursor if it scrolls out of bounds (optional, but good for polish)
                        opacity: cursorCoords.y < 16 || cursorCoords.x < 64 ? 0 : 1
                    }}
                    >
                    {/* "You" Tag */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 rounded-[4px] bg-[#f97316] text-[10px] font-bold text-white whitespace-nowrap shadow-sm">
                        You
                        {/* Tiny arrow pointing down */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#f97316]" />
                    </div>
                    </div>
                )}
                </div>
            </div>
        </Panel>

        <PanelResizeHandle className="bg-border" />

        {/* Output Panel - Resizable */}
        <Panel defaultSize={30} minSize={10}>
            <div className="h-full flex flex-col min-h-0 border-t border-[#1f1f1f] bg-[#000000] z-30 relative shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#1f1f1f] bg-[#0a0a0a] shrink-0">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Output Panel
                    </span>
                    {outputString && (
                    <button
                        onClick={() => setResult(null)}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                    >
                        <RefreshCw className="h-3 w-3" /> Clear
                    </button>
                    )}
                </div>
                <div className="flex-1 p-4 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                    {outputString ? (
                    <span className={result?.success ? "text-[#abb2bf]" : "text-red-400"}>{outputString}</span>
                    ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 space-y-3">
                        <Code2 className="h-10 w-10 opacity-30" />
                        <p className="text-sm font-medium">Run your code to see the output</p>
                    </div>
                    )}
                </div>
            </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};