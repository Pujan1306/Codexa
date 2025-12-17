import{ useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  speed?: number;
  deletionSpeed?: number;
  pause?: number;
  label?: string; 
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  speed = 100,
  deletionSpeed = 50,
  pause = 2000,
  label = "You",
}: TypewriterEffectProps) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    
    const tick = () => {
      setText((prev) => 
        isDeleting 
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );
    };

    let timer: any;

    if (isDeleting) {
      timer = setTimeout(tick, deletionSpeed);
    } else {
      timer = setTimeout(tick, speed);
    }

    if (!isDeleting && text === currentWord) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, speed, deletionSpeed, pause]);

  return (
    <div className={cn("inline-flex items-center font-mono font-medium", className)}>
      <span>{text}</span>
   
      <span className="relative ml-0.5 h-[1.2em] w-[2px]">
    
        <span 
          className={cn(
            "absolute inset-0 bg-[#f97316] animate-pulse",
            cursorClassName
          )} 
        />
        
      
        {label && (
          <span 
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 rounded-[4px] bg-[#f97316] text-[10px] font-bold text-white whitespace-nowrap z-10 animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            {label}
        
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#f97316]" />
          </span>
        )}
      </span>
    </div>
  );
};
