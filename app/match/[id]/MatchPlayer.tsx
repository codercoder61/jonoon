"use client";

import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { useState } from "react";

type Stream = {
  id: string | number;
  anchor: string;
};

type Props = {
  streams: {
    list: Stream[];
  };
};

export default function MatchPlayer({ streams }: Props) {
  const [server, setServer] = useState(
    streams.list[0]?.anchor ?? ""
  );

  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowRight />
          العودة للمباريات
        </Link>

        <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-2xl">
          <div className="aspect-video w-full">
            {server && (
              <iframe
                src={server}
                className="size-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
            <Radio className="text-primary" />
            اختر سيرفر البث
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {streams.list.map((stream, index) => (
              <button
                key={stream.id}
                type="button"
                onClick={() => setServer(stream.anchor)}
                className="rounded-2xl border border-border bg-card p-4 font-bold transition hover:border-primary/50"
              >
                <span className="float-left text-sm text-muted-foreground">
                  سيرفر {index + 1}
                </span>
              </button>
            ))}
          </div>
        </section>

      </main>
    </SiteShell>
  );
}