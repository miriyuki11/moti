import Link from "next/link";

type SiteHeaderProps = {
  completedSessions: number;
};

export function SiteHeader({ completedSessions }: SiteHeaderProps) {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="mori ホーム">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M16 7c-1.5-3-4-3.5-6-3 1 2.5 3 4 6 4" />
            <path d="M16 8c1.4-3 4-4.2 6-4-1 2.8-3 4.4-6 5" />
            <path d="M16 9c-6.2 0-10 4-10 9.4C6 24 10 28 16 28s10-4 10-9.6C26 13 22.2 9 16 9Z" />
            <path d="M16 10c-.3 2.2-.3 3.9 0 5" />
          </svg>
        </span>
        <span>
          mori<span className="brand-period">.</span>
        </span>
      </Link>
      <p className="topbar-note">自分のペースで、ひとつずつ。</p>
      <div className="today-badge">
        <span className="today-dot" />
        今日の集中 <strong>{completedSessions}</strong> 回
      </div>
    </header>
  );
}
