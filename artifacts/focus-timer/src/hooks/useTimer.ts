import { useState, useEffect, useRef, useCallback } from "react";
import { useSound } from "./useSound";
import { useSettings } from "./useSettings";

export function useTimer(initialDuration: number) {
  const { settings } = useSettings();
  const { playSound } = useSound();
  
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  
  // Track notifications to not trigger multiple times
  const notified25 = useRef(false);
  const notified50 = useRef(false);
  const notified75 = useRef(false);

  // Update time left when initial duration changes and timer is not active
  useEffect(() => {
    if (!isActive && timeLeft === duration) {
      setDuration(initialDuration);
      setTimeLeft(initialDuration);
    }
  }, [initialDuration, isActive, duration, timeLeft]);

  const tick = useCallback(() => {
    if (!endTimeRef.current) return;
    
    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
    
    setTimeLeft(remaining);
    
    if (remaining === 0) {
      setIsActive(false);
      endTimeRef.current = null;
      if (settings.notificationTriggers["100"]) {
        playSound();
      }
      return;
    }

    // Check intermediate notifications
    const elapsed = duration - remaining;
    const progress = elapsed / duration;

    if (progress >= 0.25 && progress < 0.5 && !notified25.current) {
      notified25.current = true;
      if (settings.notificationTriggers["25"]) playSound("chime");
    } else if (progress >= 0.5 && progress < 0.75 && !notified50.current) {
      notified50.current = true;
      if (settings.notificationTriggers["50"]) playSound("chime");
    } else if (progress >= 0.75 && progress < 1 && !notified75.current) {
      notified75.current = true;
      if (settings.notificationTriggers["75"]) playSound("chime");
    }
    
    timerRef.current = requestAnimationFrame(tick);
  }, [duration, playSound, settings.notificationTriggers]);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsActive(true);
      endTimeRef.current = Date.now() + timeLeft * 1000;
      timerRef.current = requestAnimationFrame(tick);
    }
  }, [timeLeft, tick]);

  const pause = useCallback(() => {
    setIsActive(false);
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    endTimeRef.current = null;
  }, []);

  const reset = useCallback((newDuration?: number) => {
    pause();
    const d = newDuration !== undefined ? newDuration : duration;
    setDuration(d);
    setTimeLeft(d);
    notified25.current = false;
    notified50.current = false;
    notified75.current = false;
  }, [duration, pause]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, []);

  return {
    timeLeft,
    duration,
    isActive,
    start,
    pause,
    reset,
  };
}
