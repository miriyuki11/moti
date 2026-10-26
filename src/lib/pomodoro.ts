export type PomodoroMode = "focus" | "shortBreak" | "longBreak";

export const POMODORO_MODES: Record<
  PomodoroMode,
  { label: string; duration: number }
> = {
  focus: { label: "集中", duration: 25 },
  shortBreak: { label: "小休憩", duration: 5 },
  longBreak: { label: "長休憩", duration: 15 },
};

export function formatTime(milliseconds: number) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
