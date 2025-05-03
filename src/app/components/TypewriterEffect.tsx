"use client";

import { useState, useEffect } from 'react';
import { usePerformance } from '../context/PerformanceContext';

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
  const { performanceMode } = usePerformance();

  const shouldAnimate = performanceMode === 'full';

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayText(text);
      setIsTypingComplete(true);
      setShowCursorElement(false);
      return;
    }

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
  }, [text, typingSpeed, startDelay, shouldAnimate, cursorBlinkDuration]);

  useEffect(() => {
    if (!isTypingComplete || !shouldAnimate || !showCursorElement) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [isTypingComplete, cursorBlinkSpeed, shouldAnimate, showCursorElement]);

  return (
    <span className={className}>
      {displayText}
      {shouldAnimate && showCursorElement && (
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
      )}
    </span>
  );
};

export default TypewriterEffect;
