"use client";

import {
  formatTime,
  POMODORO_MODES,
  type PomodoroMode,
} from "@/lib/pomodoro";
import { SessionSummary } from "./SessionSummary";

type TimerCardProps = {
  mode: PomodoroMode;
  remainingMs: number;
  totalMs: number;
  progress: number;
  completedSessions: number;
  cycleProgress: number;
  completionMessage: string;
  isRunning: boolean;
  onModeSelect: (mode: PomodoroMode) => void;
  onToggle: () => void;
  onReset: () => void;
};

const MODE_OPTIONS: PomodoroMode[] = ["focus", "shortBreak", "longBreak"];

export function TimerCard({
  mode,
  remainingMs,
  totalMs,
  progress,
  completedSessions,
  cycleProgress,
  completionMessage,
  isRunning,
  onModeSelect,
  onToggle,
  onReset,
}: TimerCardProps) {
  return (
    <section className="timer-card" aria-label="ポモドーロタイマー">
      <div className="timer-main">
        <div className="mode-tabs" role="group" aria-label="タイマーのモード">
          {MODE_OPTIONS.map((item) => (
            <button
              key={item}
              className={`mode-tab${mode === item ? " is-selected" : ""}`}
              type="button"
              aria-pressed={mode === item}
              onClick={() => onModeSelect(item)}
            >
              {POMODORO_MODES[item].label}
            </button>
          ))}
        </div>

        <div
          className={`timer-ring${mode !== "focus" ? " is-break" : ""}`}
          role="timer"
          aria-label={`${POMODORO_MODES[mode].label} 残り ${formatTime(remainingMs)}`}
          aria-live="off"
        >
          <svg className="ring-svg" viewBox="0 0 280 280" aria-hidden="true">
            <circle className="ring-track" cx="140" cy="140" r="126" />
            <circle
              className="ring-progress"
              cx="140"
              cy="140"
              r="126"
              style={{
                strokeDasharray: `${2 * Math.PI * 126}`,
                strokeDashoffset: `${2 * Math.PI * 126 * (1 - progress)}`,
              }}
            />
          </svg>
          <div className="timer-readout">
            <span className="timer-label">
              {isRunning
                ? "NOW IN"
                : mode === "focus"
                  ? "TAKE YOUR TIME"
                  : "A MOMENT FOR YOU"}
            </span>
            <span className="timer-digits">{formatTime(remainingMs)}</span>
            <span className="timer-mode-label">
              {POMODORO_MODES[mode].label}の時間
            </span>
          </div>
          <span className="ring-decoration ring-decoration-one" />
          <span className="ring-decoration ring-decoration-two" />
        </div>

        <div className="timer-actions">
          <button className="start-button" type="button" onClick={onToggle}>
            {isRunning ? (
              <>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.5 4.5h2.8v11H6.5zm4.2 0h2.8v11h-2.8z" />
                </svg>
                一時停止
              </>
            ) : (
              <>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.6 4.4a.7.7 0 0 1 1.1-.6l8.1 5.5a.8.8 0 0 1 0 1.4l-8.1 5.5a.7.7 0 0 1-1.1-.6V4.4Z" />
                </svg>
                {remainingMs === totalMs
                  ? mode === "focus"
                    ? "集中をはじめる"
                    : `${POMODORO_MODES[mode].label}をはじめる`
                  : "つづける"}
              </>
            )}
          </button>
          <button
            className="reset-button"
            type="button"
            onClick={onReset}
            aria-label="タイマーをリセット"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3.5 9a6.5 6.5 0 1 1 .8 4.3M3.5 4.5V9h4.6" />
            </svg>
          </button>
        </div>
        <p className="completion-message" aria-live="polite">
          {completionMessage || "気負わず、まずはひとつから。"}
        </p>
      </div>

      <SessionSummary
        completedSessions={completedSessions}
        cycleProgress={cycleProgress}
      />
    </section>
  );
}
