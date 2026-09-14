import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Trophy, Zap } from "lucide-react";
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
    setBeatIndex(0);
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

  return (
    <div className="living-ticket-wrap" aria-live="polite" aria-atomic="true">
      <div className="living-ticket-glow" aria-hidden="true" />
      <article className="living-ticket ticket-notches">
        <div className="ticket-sheen" aria-hidden="true" />
        <div key={beatIndex} className="ticket-beat">
          {prizeBeat ? (
            <>
              <div className="min-w-0 flex-1 px-6 py-5">
                <p className="text-[9px] font-extrabold uppercase text-cream/50">
                  {prizeBeat.place === 1 ? "This week’s top prize" : `${ordinal(prizeBeat.place)} place prize`}
                </p>
                <p className="font-display mt-1.5 whitespace-nowrap text-[34px] font-black leading-none text-cream">
                  {formatNaira(prizeBeat.amount)}
                </p>
                <p className="mt-2 text-[11px] font-medium text-cream/60">
                  paid to the #{prizeBeat.place} player
                </p>
              </div>
              <div className="ticket-stub relative flex w-[92px] shrink-0 flex-col items-center justify-center border-l border-dashed border-ink/45 bg-gold text-ink">
                <span className="font-display text-[27px] font-black leading-none">{ordinal(prizeBeat.place)}</span>
                <span className="mt-1 text-[9px] font-extrabold uppercase">Place</span>
              </div>
            </>
          ) : (
            <div className="crowd-beat flex w-full items-center gap-5 px-6 py-5">
              <div className="crowd-mark" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div>
                <p className="text-[9px] font-extrabold uppercase text-gold">The prizes keep going</p>
                <p className="font-display mt-1 text-[25px] font-black leading-tight text-cream">
                  …and {activeBeat.remaining} more cash prizes
                </p>
                <p className="mt-1.5 text-[11px] font-medium text-cream/55">More places. More winners paid.</p>
              </div>
            </div>
          )}
        </div>
      </article>

      {isStatic && remaining > 0 ? (
        <p className="absolute bottom-2 left-6 text-[9px] font-bold text-cream/55">+{remaining} more win cash</p>
      ) : null}

      {!isStatic ? (
        <div className="mt-2.5 flex justify-center gap-1.5" aria-hidden="true">
          {beats.map((beat, index) => (
            <span
              key={beat.kind === "prize" ? beat.prize.place : "crowd"}
              className={`h-1 rounded-full transition-all duration-500 ${index === beatIndex ? "w-5 bg-brand" : "w-1 bg-ink/15"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SheetButton({ children, variant }: { children: string; variant: "primary" | "secondary" }) {
  return (
    <button
      type="button"
      className={
        variant === "primary"
          ? "h-12 w-full rounded-xl bg-brand text-sm font-extrabold text-primary-foreground"
          : "h-12 w-full rounded-xl border border-ink bg-transparent text-sm font-extrabold text-ink"
      }
    >
      {children}
    </button>
  );
}

function Index() {
  return (
    <main className="flex min-h-screen items-end justify-center bg-ink/95 text-ink sm:items-center sm:py-6">
      <section className="offer-sheet flex min-h-[100dvh] w-full max-w-[390px] flex-col bg-cream px-5 pb-5 pt-3 sm:min-h-0 sm:rounded-[24px]">
        <div className="mx-auto h-1 w-10 rounded-full bg-ink/20" aria-hidden="true" />

        <header className="mt-5 flex items-center justify-between gap-4">
          <p className="text-[10px] font-extrabold uppercase">This week’s board</p>
          <p className="text-[10px] font-bold text-ink/55">Ends Sunday 8:00 PM</p>
        </header>

        <h1 className="font-display mt-3 text-[31px] font-black leading-[1.05]">
          Real cash. Real rivals.
          <br />
          Every week.
        </h1>

        <div className="mt-4">
          <LivingPrizeTicket prizes={samplePrizes} paidPositions={totalPaidPositions} />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { icon: Trophy, title: "Top 10", detail: "get paid" },
            { icon: CalendarDays, title: "Sunday", detail: "winners crowned" },
            { icon: Zap, title: "All week", detail: "points stack" },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="rounded-lg border border-ink/10 bg-card px-2.5 py-2.5">
              <Icon className="mb-2 size-3.5 text-brand" strokeWidth={2.5} aria-hidden="true" />
              <p className="text-[11px] font-extrabold">{title}</p>
              <p className="mt-0.5 text-[9px] font-medium text-ink/50">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-ink/10 bg-card px-3.5 py-3">
          <p className="text-[11px] font-semibold leading-relaxed">
            Winners get real money straight to their bank account — not points to cash out.
          </p>
        </div>

        <div className="mt-auto space-y-2.5 pt-4">
          <SheetButton variant="primary">Pay with Airtime</SheetButton>
          <SheetButton variant="secondary">Pay with Paystack</SheetButton>
          <p className="text-center text-[9px] font-medium text-ink/45">
            You&apos;ll see the exact price before you pay anything.
          </p>
        </div>
      </section>
    </main>
  );
}