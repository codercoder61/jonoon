import { CalendarDays, Radio } from "lucide-react";
import { MatchCard, SiteShell } from "@/components/site-shell";
import { getMatches } from "@/lib/api";

export default async function Page() {
  const matches = await getMatches();
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <section className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
              <span className="size-2 rounded-full bg-primary" /> نبض الملاعب
              الآن
            </p>
            <h1 className="font-display text-4xl font-black tracking-tight sm:text-6xl">
              مباريات <span className="text-primary">اليوم</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              كل ما تحتاجه لمتابعة كرة القدم في مكان واحد. نتائج مباشرة، مواعيد
              المباريات وروابط البث.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
            <CalendarDays className="text-primary" /> السبت، 13 سبتمبر 2026
          </div>
        </section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-black">جدول المباريات</h2>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Radio className="size-4 text-primary" /> {matches.length} مباريات
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {matches.gamesList && matches.gamesList.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
