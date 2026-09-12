import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Clock3 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Friday Blitz Result | Kweza" },
      { name: "description", content: "See your Kweza Friday Blitz result and carry your momentum into the weekly board." },
      { property: "og:title", content: "Friday Blitz Result | Kweza" },
      { property: "og:description", content: "See your Kweza Friday Blitz result and carry your momentum into the weekly board." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[390px] flex-col overflow-hidden bg-blitz px-5 pb-6 pt-5 shadow-2xl">
        <header className="flex items-center justify-center">
          <p className="font-display text-base font-extrabold">Kweza · Friday Blitz</p>
        </header>

        <div className="result-settle mt-8 text-center">
          <p className="text-[10px] font-bold uppercase text-cream/60">You just placed</p>
          <h1 className="font-display text-[92px] font-black leading-[0.9] text-cream">№12</h1>
          <p className="mt-2 text-sm font-semibold text-cream/70">out of 214 sharp players tonight</p>
        </div>

        <div className="ticket-stage relative mt-8 pt-9">
          <div className="absolute inset-x-7 top-1 h-14 rotate-[-4deg] rounded-xl border border-cream/15 bg-cream/10" />
          <div className="absolute inset-x-7 top-5 h-14 rotate-[3deg] rounded-xl border border-cream/15 bg-cream/15" />

          <article className="relative overflow-hidden rounded-2xl border border-cream/5 bg-ink shadow-2xl">
            <div className="grid grid-cols-[1fr_auto] items-end gap-5 px-6 py-5">
              <div>
                <p className="text-[9px] font-bold uppercase text-cream/45">Tonight&apos;s score</p>
                <p className="font-display mt-1 text-3xl font-black">2,700 points</p>
              </div>
              <div className="pb-0.5 text-right">
                <p className="font-display text-3xl font-black text-lime">#1</p>
                <p className="text-[9px] font-bold uppercase text-cream/40">Rank</p>
              </div>
            </div>

            <div className="relative border-t border-dashed border-cream/15 px-6 py-5 text-center before:absolute before:-left-3 before:-top-3 before:size-6 before:rounded-full before:bg-blitz after:absolute after:-right-3 after:-top-3 after:size-6 after:rounded-full after:bg-blitz">
              <p className="font-display text-xl font-extrabold leading-snug">
                Turn tonight&apos;s momentum into <span className="text-lime">real cash</span> in your bank.
              </p>
              <div className="mx-auto mt-4 flex w-fit flex-col items-center text-lime" aria-hidden="true">
                <span className="h-5 w-px bg-lime/50" />
                <span className="size-2 rotate-45 border-b-2 border-r-2 border-lime" />
              </div>
            </div>
          </article>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-medium text-cream/55" role="status">
          <Clock3 className="size-3.5" aria-hidden="true" />
          <span>Prizes ready to claim by 9:20 PM</span>
        </div>

        <div className="mt-auto pt-8">
          <button type="button" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-4 font-display text-base font-extrabold text-ink shadow-[0_7px_0_color-mix(in_oklab,var(--lime)_55%,var(--ink))] transition-transform active:translate-y-1">
            Join the weekly board
            <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <button type="button" className="mt-3 w-full py-2 text-sm font-semibold text-cream/50">Maybe later</button>
        </div>
      </section>
    </main>
  );
}