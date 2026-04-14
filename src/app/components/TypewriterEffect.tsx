"use client";

import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
  startDelay?: number;
  cursorBlinkDuration?: number;
}

const TypewriterEffect = ({
  text,
  className = '',
  typingSpeed = 100,
  cursorBlinkSpeed = 500,
  startDelay = 500,
  cursorBlinkDuration = 5000
}: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursorElement, setShowCursorElement] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
          
          setTimeout(() => {
            setShowCursorElement(false);
          }, cursorBlinkDuration);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, typingSpeed, startDelay, cursorBlinkDuration]);

  useEffect(() => {
    if (!isTypingComplete || !showCursorElement) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [isTypingComplete, cursorBlinkSpeed, showCursorElement]);

  return (
    <span className={className}>
      {displayText}
      {showCursorElement && (
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
      )}
    </span>
  );
};

export default TypewriterEffect;
