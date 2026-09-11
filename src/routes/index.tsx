import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Check, ChevronRight, Clock3, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Friday Blitz Results | Kweza" },
      { name: "description", content: "Review three Kweza Friday Blitz result-screen conversion directions." },
      { property: "og:title", content: "Friday Blitz Results | Kweza" },
      { property: "og:description", content: "Three ways to carry a strong Friday Blitz finish into Kweza's weekly cash board." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Direction = "pass" | "route" | "proof";

const directions: { id: Direction; label: string }[] = [
  { id: "pass", label: "Earned pass" },
  { id: "route", label: "Momentum route" },
  { id: "proof", label: "Proof equation" },
];

function Index() {
  const [direction, setDirection] = useState<Direction>("pass");

  return (
    <main className="min-h-screen bg-ink text-cream">
      <div className="mx-auto min-h-screen w-full max-w-[390px] overflow-hidden bg-blitz shadow-2xl">
        <BlitzScreen direction={direction} />
      </div>
      <nav aria-label="Design direction" className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-cream/10 bg-ink/95 p-1 shadow-xl backdrop-blur">
        {directions.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setDirection(item.id)}
            className={`rounded-full px-3 py-2 text-[10px] font-bold transition-colors ${direction === item.id ? "bg-lime text-ink" : "text-cream/55"}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </main>
  );
}

function KwezaHeader({ direction }: { direction: Direction }) {
  return (
    <header className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-lg bg-lime text-xs font-extrabold text-blitz">K</span>
        <b className="text-sm">Kweza · Friday Blitz</b>
      </div>
      <span className="text-[10px] font-bold uppercase text-cream/35">{directions.find((item) => item.id === direction)?.label}</span>
    </header>
  );
}

function Placement({ direction }: { direction: Direction }) {
  if (direction === "pass") {
    return (
      <div className="px-5 pt-7">
        <p className="text-[10px] font-extrabold uppercase text-lime">You just placed</p>
        <div className="mt-1 flex items-end gap-3">
          <div className="relative rotate-[-2deg] border-2 border-lime/80 px-4 py-1 shadow-[6px_6px_0_var(--ink)]">
            <span className="absolute -top-2 right-2 bg-blitz px-1 text-[8px] font-black uppercase text-lime">verified finish</span>
            <h1 className="text-[68px] font-extrabold leading-none">№12</h1>
          </div>
          <p className="pb-2 text-xs font-semibold leading-snug text-cream/60">out of 214<br />sharp players tonight</p>
        </div>
      </div>
    );
  }

  if (direction === "route") {
    return (
      <div className="relative px-5 pt-7">
        <div className="absolute left-0 top-11 h-12 w-1 bg-lime" />
        <p className="text-[10px] font-extrabold uppercase text-lime">You just placed</p>
        <div className="mt-1 flex items-end">
          <h1 className="text-[86px] font-extrabold leading-[0.9]">№12</h1>
          <div className="mb-1 ml-3 flex-1 border-l border-cream/20 pl-3">
            <p className="text-[9px] font-bold uppercase text-cream/35">Tonight's field</p>
            <p className="mt-1 text-sm font-bold">12 / 214</p>
            <p className="text-[10px] font-semibold text-cream/50">sharp players</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-7">
      <p className="text-[10px] font-extrabold uppercase text-lime">You just placed</p>
      <div className="mt-1 grid grid-cols-[auto_1fr] items-end gap-4">
        <h1 className="text-[84px] font-extrabold leading-[0.88]">12</h1>
        <div className="pb-1">
          <span className="inline-block bg-lime px-2 py-0.5 text-[10px] font-black uppercase text-ink">№ tonight</span>
          <p className="mt-2 max-w-36 text-xs font-semibold leading-snug text-cream/60">out of 214 sharp players tonight</p>
        </div>
      </div>
    </div>
  );
}

function TicketBacks({ direction }: { direction: Direction }) {
  return (
    <>
      <div className={`absolute inset-x-7 top-1 rounded-xl border border-cream/10 bg-cream/10 px-5 py-3 text-[10px] font-bold text-cream/45 ${direction === "route" ? "rotate-[2deg]" : "rotate-[-4deg]"}`}>
        OddOneOut · complete
      </div>
      <div className={`absolute inset-x-7 top-7 rounded-xl border border-cream/10 bg-cream/15 px-5 py-3 text-[10px] font-bold text-cream/55 ${direction === "proof" ? "rotate-[-2deg]" : "rotate-[3deg]"}`}>
        CheckMate · complete
      </div>
    </>
  );
}

function ConversionDevice({ direction }: { direction: Direction }) {
  if (direction === "pass") {
    return (
      <div className="relative grid grid-cols-[1fr_76px] items-stretch">
        <div className="px-5 py-3">
          <p className="text-[9px] font-bold uppercase text-lime">Weekly pass earned</p>
          <p className="mt-1 text-sm font-extrabold leading-tight">You proved it tonight.</p>
          <p className="mt-1 text-[10px] font-semibold leading-snug text-cream/50">Take that form to the board where points can become real cash.</p>
        </div>
        <div className="ticket-perf grid place-content-center border-l border-dashed border-cream/15 bg-lime text-center text-ink">
          <Check className="mx-auto size-5 stroke-[3]" />
          <span className="mt-1 text-[8px] font-black uppercase">Admit one</span>
        </div>
      </div>
    );
  }

  if (direction === "route") {
    return (
      <div className="px-5 py-3">
        <p className="text-[9px] font-bold uppercase text-cream/35">Carry the run forward</p>
        <div className="mt-3 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2">
          <div><b className="text-xs text-cream">Tonight</b><p className="text-[8px] text-cream/35">proved</p></div>
          <span className="h-px bg-lime/45" />
          <div className="grid size-7 place-items-center rounded-full border border-lime text-lime"><Zap className="size-3 fill-current" /></div>
          <span className="h-px bg-lime/45" />
          <div className="text-right"><b className="text-xs text-lime">Real cash</b><p className="text-[8px] text-cream/35">weekly board</p></div>
        </div>
        <div className="mx-auto mt-2 flex w-fit flex-col items-center text-lime"><span className="text-[9px] font-bold">Keep moving</span><ArrowDown className="size-4" /></div>
      </div>
    );
  }

  return (
    <div className="px-5 py-3">
      <p className="text-[9px] font-bold uppercase text-cream/35">Tonight settled one thing</p>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center text-center">
        <div><b className="text-xl text-lime">#1</b><p className="text-[8px] font-bold uppercase text-cream/40">game rank</p></div>
        <span className="text-xl font-light text-cream/25">+</span>
        <div><b className="text-xl">Your form</b><p className="text-[8px] font-bold uppercase text-cream/40">all week</p></div>
        <span className="text-xl font-light text-cream/25">=</span>
        <div><b className="text-sm text-lime">Cash race</b><p className="text-[8px] font-bold uppercase text-cream/40">weekly board</p></div>
      </div>
      <p className="mt-2 text-center text-[10px] font-semibold text-cream/55">You’ve shown the skill. Now put it where it pays.</p>
    </div>
  );
}

function ScoreTicket({ direction }: { direction: Direction }) {
  return (
    <div className="relative mt-5 h-[276px] px-5">
      <TicketBacks direction={direction} />
      <div className="ticket-rise absolute inset-x-5 top-12 overflow-hidden rounded-xl bg-ink shadow-2xl">
        <div className="flex min-h-[104px] items-stretch">
          <div className="flex-1 px-5 py-4">
            <p className="text-[9px] font-bold uppercase text-cream/40">Tonight's score</p>
            <b className="mt-1 block text-2xl">2,700 points</b>
            <p className="mt-1 text-[10px] font-semibold text-cream/35">Friday Blitz complete</p>
          </div>
          <div className="ticket-perf w-4 opacity-30" />
          <div className="grid w-[82px] place-content-center text-center">
            <b className="text-xl text-lime">#1</b>
            <span className="text-[9px] font-bold text-cream/35">RANK</span>
          </div>
        </div>
        <div className="border-t border-dashed border-cream/20">
          <ConversionDevice direction={direction} />
        </div>
      </div>
    </div>
  );
}

function BlitzScreen({ direction }: { direction: Direction }) {
  return (
    <section key={direction} className="flex min-h-screen flex-col bg-blitz pb-20 text-cream">
      <KwezaHeader direction={direction} />
      <Placement direction={direction} />
      <ScoreTicket direction={direction} />
      <div className="mx-5 flex items-center justify-center gap-2 border-y border-cream/10 py-2.5 text-[10px] font-semibold text-cream/50">
        <Clock3 className="size-3.5" />
        <span>Prizes ready to claim by 9:20 PM</span>
      </div>
      <div className="mt-auto px-5 pt-4">
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-4 font-extrabold text-ink shadow-[0_7px_0_color-mix(in_oklab,var(--lime)_55%,var(--ink))] transition-transform active:translate-y-1">
          Join the weekly board <ChevronRight className="size-4" />
        </button>
        <button type="button" className="mt-2 w-full py-2 text-sm font-semibold text-cream/45">Maybe later</button>
      </div>
    </section>
  );
}