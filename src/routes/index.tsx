import { createFileRoute } from "@tanstack/react-router";
import { Banknote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Join This Week’s Board | Kweza" },
      {
        name: "description",
        content: "Join Kweza’s weekly board, play all week, and compete for real cash prizes.",
      },
      { property: "og:title", content: "Join This Week’s Board | Kweza" },
      {
        property: "og:description",
        content: "Join Kweza’s weekly board, play all week, and compete for real cash prizes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Prize = {
  place: number;
  amount: number;
};

const samplePrizes: Prize[] = [
  { place: 1, amount: 50_000 },
  { place: 2, amount: 30_000 },
  { place: 3, amount: 20_000 },
];

const totalPaidPositions = 10;

function ordinal(place: number) {
  const remainder = place % 100;
  if (remainder >= 11 && remainder <= 13) return `${place}th`;
  if (place % 10 === 1) return `${place}st`;
  if (place % 10 === 2) return `${place}nd`;
  if (place % 10 === 3) return `${place}rd`;
  return `${place}th`;
}

function formatNaira(amount: number) {
  return `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function LivingPrizeTicket({ prizes, paidPositions }: { prizes: Prize[]; paidPositions: number }) {
  const reducedMotion = useReducedMotion();
  const visiblePrizes = prizes.slice(0, Math.min(3, paidPositions));
  const remaining = Math.max(0, paidPositions - visiblePrizes.length);
  const beats = useMemo(
    () => [
      ...visiblePrizes.map((prize) => ({ kind: "prize" as const, prize })),
      ...(remaining > 0 ? [{ kind: "crowd" as const, remaining }] : []),
    ],
    [remaining, visiblePrizes],
  );
  const [beatIndex, setBeatIndex] = useState(0);
  const isStatic = paidPositions <= 1 || beats.length <= 1 || reducedMotion;

  useEffect(() => {
    if (isStatic) return;

    const delay = beatIndex === 0 ? 3200 : beatIndex === beats.length - 1 ? 3000 : 2700;
    const timer = window.setTimeout(() => {
      setBeatIndex((current) => (current + 1) % beats.length);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [beatIndex, beats.length, isStatic]);

  const firstPrize = visiblePrizes[0];
  if (!firstPrize) return null;
  const activeBeat = beats[beatIndex] ?? beats[0];
  if (!activeBeat) return null;

  const prizeBeat = activeBeat.kind === "prize" ? activeBeat.prize : null;
  const crowdCount = activeBeat.kind === "crowd" ? activeBeat.remaining : 0;

  return (
    <div className="living-ticket-wrap" aria-live="polite" aria-atomic="true">
      <article className="ticket-notches h-[104px] overflow-hidden rounded-xl bg-ink shadow-xl">
        <div className="flex h-full items-stretch">
          <div key={`copy-${beatIndex}`} className="ticket-copy-change flex min-w-0 flex-1 flex-col justify-center px-6 py-3">
            <p className="text-[10px] font-bold uppercase text-cream/50">
              {prizeBeat
                ? prizeBeat.place === 1
                  ? "This week’s top prize"
                  : `${ordinal(prizeBeat.place)} place prize`
                : "More winners this week"}
            </p>
            <p className={`mt-1 font-display font-extrabold leading-none text-cream ${prizeBeat ? "text-3xl" : "text-[22px]"}`}>
              {prizeBeat ? formatNaira(prizeBeat.amount) : `…and ${crowdCount} more`}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold text-cream/50">
              {prizeBeat ? `paid to the #${prizeBeat.place} player` : "cash prizes"}
            </p>
            {isStatic && paidPositions > 1 ? (
              <p className="mt-1 text-[9px] font-semibold text-cream/40">+{paidPositions - 1} more win cash</p>
            ) : null}
          </div>
          <div className="ticket-perf w-4 shrink-0 opacity-40" aria-hidden="true" />
          <div key={`stub-${beatIndex}`} className="ticket-copy-change grid w-24 shrink-0 place-content-center bg-gold text-center text-ink">
            <b className={prizeBeat ? "font-display text-xl font-extrabold" : "font-display text-lg font-extrabold"}>
              {prizeBeat ? ordinal(prizeBeat.place) : `Top ${paidPositions}`}
            </b>
            <span className="text-[9px] font-bold uppercase">{prizeBeat ? "Place" : "Paid"}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-ink/70 text-ink">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[390px] flex-col justify-end overflow-hidden bg-ink/70 shadow-2xl">
        <div aria-hidden="true" className="absolute inset-0 bg-cream opacity-25" />
        <div className="ticket-rise relative rounded-t-[28px] bg-cream pb-5">
          <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-ink/15" aria-hidden="true" />
          <header className="px-5 pt-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="uppercase text-brand">This week&apos;s board</span>
              <span className="text-ink/45">Ends Sunday 8 PM</span>
            </div>
            <h1 className="mt-2 text-[30px] font-extrabold leading-[1.05]">
              Real cash. Real rivals.
              <br />
              One Sunday.
            </h1>
          </header>

          <div className="relative mt-5 h-40 px-5">
            <div className="absolute left-7 right-7 top-0 rotate-[-4deg] rounded-xl bg-brand px-5 py-3 text-xs font-bold text-cream">
              2nd place · ₦30,000
            </div>
            <div className="absolute left-7 right-7 top-6 rotate-[3deg] rounded-xl border border-ink/10 bg-card px-5 py-3 text-xs font-bold text-ink/45">
              3rd place · ₦20,000
            </div>
            <div className="absolute inset-x-5 top-10">
              <LivingPrizeTicket prizes={samplePrizes} paidPositions={totalPaidPositions} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 px-5">
            {[
              ["₦1.8M", "paid last month"],
              ["12,480", "players this week"],
              ["Sunday", "winners crowned"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-xl bg-card py-3 text-center shadow-sm">
                <b className="text-base text-brand">{title}</b>
                <p className="mt-1 text-[9px] font-semibold text-ink/45">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mx-5 mt-3 flex gap-3 rounded-xl bg-card p-3 shadow-sm">
            <Banknote className="size-5 shrink-0 text-brand" aria-hidden="true" />
            <p className="text-xs font-semibold leading-relaxed text-ink/65">
              Winners get real money straight to their bank account — not points to cash out.
            </p>
          </div>

          <div className="px-5 pt-4">
            <button type="button" className="w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-cream">
              Pay with airtime
            </button>
            <button type="button" className="mt-2 w-full rounded-xl border border-ink/15 py-3 text-sm font-bold">
              Pay with Paystack
            </button>
            <p className="mt-2 text-center text-[10px] font-semibold text-ink/40">
              You&apos;ll see the exact price before you pay anything.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}