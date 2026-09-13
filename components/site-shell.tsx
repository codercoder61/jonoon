"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun, Trophy } from "lucide-react";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="العودة إلى الرئيسية"
          >
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/10">
              <Trophy />
            </span>
            <span className="font-display text-xl font-black tracking-tight">
              جنون <span className="text-primary">المباريات</span>
            </span>
          </Link>
          <nav
            className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex"
            aria-label="التنقل الرئيسي"
          >
          
          </nav>
          <button
            onClick={toggleTheme}
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground"
            aria-label={dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>
      </header>
      {children}
      <footer className="mt-16 border-t border-border/70 bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:px-6 sm:text-right">
          <p>© 2026 جنون المباريات. جميع الحقوق محفوظة.</p>
          <p>تابع المباراة، وعش اللحظة.</p>
        </div>
      </footer>
    </div>
  );
}

export function TeamLogo({ src }: { src?: string }) {
  return <img src={src} className="size-12 object-contain" /> ;
}

export function StatusBadge({ status }: { status: string }) {
  const live = status === "جارية الان";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${live ? "bg-red-500/10 text-red-500" : "bg-muted text-muted-foreground"}`}
    >
      {live && (
        <span className="size-1.5 animate-pulse rounded-full bg-current" />
      )}
      {status}
    </span>
  );
}

export function MatchCard({ match }: { match: Match }) {
  return (
    <Link
      key={match.id}
      href={`/match/${encodeURIComponent(match.anchor)}`}
      className="group block rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="mb-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>{match.competition}</span>
        <StatusBadge status={match.currentMatchScore} />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
       
         <div className="flex flex-col items-center gap-2">
          <TeamLogo src={match.secondTeamLogo} name={match.secondTeamName} />
          <strong className="text-sm">{match.secondTeamName}</strong>
        </div>
        <div>
          <div className="font-display text-3xl font-black tracking-tight">
            {match.matchScore}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <TeamLogo src={match.firstTeamLogo} name={match.firstTeamName} />
          <strong className="text-sm">{match.firstTeamName}</strong>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span>القناة الناقلة</span>
        <span className="font-bold text-foreground">{match.qanat}</span>
      </div>
    </Link>
  );
}

export type Match = {
  id:int;
  competition: string;
  anchor: string;
  currentMatchScore: string;
  firstTeamLogo: string;
  secondTeamLogo: string;
  firstTeamName: string;
  matchScore: string;
  secondTeamName: string;
  qanat: string;
};
export type Stream = { id: string; name: string; url: string };
