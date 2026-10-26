"use client";

import { useEffect, useState } from "react";
import { POMODORO_MODES, type PomodoroMode } from "@/lib/pomodoro";

export function usePomodoroTimer() {
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [remainingMs, setRemainingMs] = useState(
    POMODORO_MODES.focus.duration * 60_000,
  );
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [completionMessage, setCompletionMessage] = useState("");

  useEffect(() => {
    if (endsAt === null) return;

    const tick = () => {
      const nextRemaining = Math.max(0, endsAt - Date.now());
      setRemainingMs(nextRemaining);

      if (nextRemaining === 0) {
        setEndsAt(null);
        if (mode === "focus") {
          const nextCompletedSessions = completedSessions + 1;
          setCompletedSessions(nextCompletedSessions);
          const nextMode =
            nextCompletedSessions % 4 === 0 ? "longBreak" : "shortBreak";
          setMode(nextMode);
          setRemainingMs(POMODORO_MODES[nextMode].duration * 60_000);
          setCompletionMessage(
            nextMode === "longBreak"
              ? "4回の集中、おつかれさま。長めの休憩をどうぞ。"
              : "集中セッション完了。少し休憩しましょう。",
          );
        } else {
          setMode("focus");
          setRemainingMs(POMODORO_MODES.focus.duration * 60_000);
          setCompletionMessage("休憩完了。次の集中を始めましょう。");
        }
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 250);
    return () => window.clearInterval(intervalId);
  }, [endsAt, mode, completedSessions]);

  const selectMode = (nextMode: PomodoroMode) => {
    setMode(nextMode);
    setRemainingMs(POMODORO_MODES[nextMode].duration * 60_000);
    setEndsAt(null);
    setCompletionMessage("");
  };

  const toggleTimer = () => {
    setCompletionMessage("");
    if (endsAt !== null) {
      setRemainingMs(Math.max(0, endsAt - Date.now()));
      setEndsAt(null);
    } else {
      setEndsAt(Date.now() + remainingMs);
    }
  };

  const resetTimer = () => {
    setEndsAt(null);
    setRemainingMs(POMODORO_MODES[mode].duration * 60_000);
    setCompletionMessage("");
  };

  const totalMs = POMODORO_MODES[mode].duration * 60_000;

  return {
    mode,
    remainingMs,
    totalMs,
    progress: 1 - remainingMs / totalMs,
    completedSessions,
    cycleProgress: completedSessions % 4,
    completionMessage,
    isRunning: endsAt !== null,
    selectMode,
    toggleTimer,
    resetTimer,
  };
}
