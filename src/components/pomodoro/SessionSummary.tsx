type SessionSummaryProps = {
  completedSessions: number;
  cycleProgress: number;
};

export function SessionSummary({
  completedSessions,
  cycleProgress,
}: SessionSummaryProps) {
  return (
    <aside className="session-aside">
      <div className="aside-heading">
        <span className="aside-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3.5v2m0 13v2M3.5 12h2m13 0h2M6 6l1.4 1.4m9.2 9.2L18 18m0-12-1.4 1.4m-9.2 9.2L6 18" />
            <circle cx="12" cy="12" r="5" />
          </svg>
        </span>
        <div>
          <p className="aside-kicker">TODAY&apos;S RHYTHM</p>
          <h2>今日のリズム</h2>
        </div>
      </div>

      <div className="session-count">
        <span className="session-number">
          {String(completedSessions).padStart(2, "0")}
        </span>
        <span className="session-unit">
          セッション
          <br />
          完了
        </span>
      </div>

      <div className="cycle-progress">
        <div className="cycle-label">
          <span>次の長い休憩まで</span>
          <span>{cycleProgress} / 4</span>
        </div>
        <div
          className="cycle-dots"
          aria-label={`4回中 ${cycleProgress} 回完了`}
        >
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`cycle-dot${dot < cycleProgress ? " is-done" : ""}`}
            >
              {dot < cycleProgress ? (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m4 8 2.5 2.5L12 5" />
                </svg>
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <div className="aside-divider" />
      <div className="gentle-note">
        <span className="note-sparkle" aria-hidden="true">
          ✳
        </span>
        <p>
          休むことも、
          <br />
          大切な集中の一部。
        </p>
      </div>
      <p className="aside-caption">
        4回の集中のあとには、
        <br />
        少し長めの休憩を。
      </p>
    </aside>
  );
}
