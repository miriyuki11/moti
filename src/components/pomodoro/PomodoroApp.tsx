"use client";

import { IntroSection } from "./IntroSection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TimerCard } from "./TimerCard";
import { usePomodoroTimer } from "@/hooks/usePomodoroTimer";

export function PomodoroApp() {
  const timer = usePomodoroTimer();

  return (
    <main className="app-shell">
      <SiteHeader completedSessions={timer.completedSessions} />
      <IntroSection />
      <TimerCard
        mode={timer.mode}
        remainingMs={timer.remainingMs}
        totalMs={timer.totalMs}
        progress={timer.progress}
        completedSessions={timer.completedSessions}
        cycleProgress={timer.cycleProgress}
        completionMessage={timer.completionMessage}
        isRunning={timer.isRunning}
        onModeSelect={timer.selectMode}
        onToggle={timer.toggleTimer}
        onReset={timer.resetTimer}
      />
      <SiteFooter />
    </main>
  );
}
