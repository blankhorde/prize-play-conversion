import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Banknote, Check, ChevronRight, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Weekly Cash Competition | Kweza" },
      { name: "description", content: "Explore Kweza's weekly cash board, Paystack plans, and Friday Blitz finish." },
      { property: "og:title", content: "Weekly Cash Competition | Kweza" },
      { property: "og:description", content: "Play all week, climb one board, and win real cash every Sunday." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Screen = "offer" | "plans" | "blitz";

function Index() {
  const [screen, setScreen] = useState<Screen>("offer");

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col overflow-hidden bg-cream shadow-2xl">
        {screen === "offer" && <OfferScreen onPaystack={() => setScreen("plans")} />}
        {screen === "plans" && <PlansScreen onBack={() => setScreen("offer")} />}
        {screen === "blitz" && <BlitzScreen onJoin={() => setScreen("offer")} />}
        <nav aria-label="Screen preview" className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-ink/90 p-1 shadow-xl backdrop-blur">
          {(["offer", "plans", "blitz"] as const).map((item) => (
            <button key={item} onClick={() => setScreen(item)} className={`rounded-full px-3 py-1.5 text-[10px] font-bold capitalize transition-colors ${screen === item ? "bg-cream text-ink" : "text-cream/60"}`}>
              {item}
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}

function OfferScreen({ onPaystack }: { onPaystack: () => void }) {
  return <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink/70">
    <div aria-hidden="true" className="absolute inset-0 bg-cream p-5 opacity-25">
      <div className="flex items-center justify-between"><b>CheckMate</b><span className="rounded-full bg-white p-2 text-xs">DO</span></div>
      <div className="mt-6 grid grid-cols-4 gap-2 rounded-xl bg-white p-4">{Array.from({length:12}).map((_,i)=><span key={i} className="aspect-square rounded-md bg-brand/20" />)}</div>
    </div>
    <div className="ticket-rise relative rounded-t-[28px] bg-cream pb-16">
      <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-ink/15" />
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between text-xs font-bold"><span className="uppercase text-brand">This week's board</span><span className="text-ink/45">Ends Sunday 8 PM</span></div>
        <h1 className="mt-2 text-[30px] font-extrabold leading-[1.05]">Real cash. Real rivals.<br/>One Sunday.</h1>
      </div>
      <div className="relative mt-5 h-40 px-5">
        <div className="absolute left-7 right-7 top-0 rotate-[-4deg] rounded-xl bg-brand px-5 py-3 text-xs font-bold text-cream">2nd place · ₦25,000</div>
        <div className="absolute left-7 right-7 top-6 rotate-[3deg] rounded-xl border border-ink/10 bg-white px-5 py-3 text-xs font-bold text-ink/45">3rd place · ₦10,000</div>
        <div className="ticket-notches absolute inset-x-5 top-10 overflow-hidden rounded-xl bg-ink shadow-xl">
          <div className="flex items-stretch"><div className="flex-1 px-6 py-4"><p className="text-[10px] font-bold uppercase text-cream/50">This week's top prize</p><p className="mt-1 text-3xl font-extrabold text-cream">₦50,000</p><p className="text-[11px] font-semibold text-cream/50">paid to the #1 player</p></div><div className="ticket-perf w-4 opacity-40"/><div className="grid w-24 place-content-center bg-gold text-center"><b className="text-xl">1st</b><span className="text-[9px] font-bold">PLACE</span></div></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-5">
        {[["₦1.8M","paid last month"],["12,480","players this week"],["Sunday","winners crowned"]].map(([a,b])=><div key={a} className="rounded-xl bg-white py-3 text-center shadow-sm"><b className="text-base text-brand">{a}</b><p className="mt-1 text-[9px] font-semibold text-ink/45">{b}</p></div>)}
      </div>
      <div className="mx-5 mt-3 flex gap-3 rounded-xl bg-white p-3 shadow-sm"><Banknote className="size-5 shrink-0 text-brand"/><p className="text-xs font-semibold leading-relaxed text-ink/65">Winners get real money straight to their bank account — not points to cash out.</p></div>
      <div className="px-5 pt-4"><button className="w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-cream">Pay with airtime</button><button onClick={onPaystack} className="mt-2 w-full rounded-xl border border-ink/15 py-3 text-sm font-bold">Pay with Paystack</button><p className="mt-2 text-center text-[10px] font-semibold text-ink/40">You'll see the exact price before you pay anything.</p></div>
    </div>
  </section>
}

const rows = ["Play CheckMate, WisdomDrop & OddOneOut", "Enter the weekly cash leaderboard", "Earn points from every game all week", "Get paid to your bank when you win"];

function PlansScreen({ onBack }: { onBack: () => void }) {
  return <section className="min-h-screen bg-cream pb-16">
    <header className="flex items-center gap-3 px-5 pt-5"><button onClick={onBack} aria-label="Back" className="grid size-9 place-items-center rounded-xl bg-ink/5"><ArrowLeft className="size-4"/></button><div><p className="text-[10px] font-bold uppercase text-brand">Paystack plans</p><h1 className="text-lg font-extrabold">Choose your board pass</h1></div></header>
    <div className="px-5 pt-5"><p className="text-xs font-bold uppercase text-ink/45">What's included</p><div className="mt-2 overflow-hidden rounded-xl bg-white shadow-sm"><div className="grid grid-cols-[1fr_56px_62px] bg-ink/[.03] text-[11px] font-bold"><span className="p-3">Benefit</span><span className="p-3 text-center text-ink/45">Free</span><span className="p-3 text-center text-brand">Player</span></div>{rows.map((r,i)=><div key={r} className="grid grid-cols-[1fr_56px_62px] items-center border-t border-ink/5 text-xs font-semibold"><span className="p-3 leading-snug text-ink/70">{r}</span><span className="text-center text-ink/30">{i===0?<Check className="mx-auto size-4"/>:<X className="mx-auto size-4"/>}</span><Check className="mx-auto size-4 text-brand"/></div>)}</div></div>
    <div className="space-y-3 px-5 pt-5">
      <div className="relative rounded-xl border border-brand/20 bg-white p-4 shadow-sm"><span className="absolute -top-2 right-4 rounded-full bg-brand px-2 py-1 text-[9px] font-extrabold uppercase text-cream">Best value</span><h2 className="font-extrabold">Monthly</h2><p className="mt-1 text-xs font-semibold text-ink/45">Keep all four Sunday boards covered.</p><button className="mt-3 flex w-full items-center justify-between rounded-xl bg-ink px-4 py-3 text-cream"><span className="text-sm font-bold">Choose monthly</span><span className="font-extrabold">₦700 <s className="text-xs text-cream/40">₦900</s></span></button><p className="mt-2 text-[10px] font-semibold text-ink/40">After the offer, ₦900/month. Cancel anytime.</p></div>
      <div className="rounded-xl bg-white p-4 shadow-sm"><h2 className="font-extrabold">Weekly</h2><p className="mt-1 text-xs font-semibold text-ink/45">One board. One Sunday. One shot.</p><button className="mt-3 flex w-full items-center justify-between rounded-xl border border-ink/15 px-4 py-3"><span className="text-sm font-bold">Choose weekly</span><span className="font-extrabold">₦200/week</span></button></div>
    </div><p className="px-5 pt-4 text-center text-[10px] font-semibold text-ink/40"><ShieldCheck className="mr-1 inline size-3"/>Secure checkout powered by Paystack.</p>
  </section>
}

function BlitzScreen({ onJoin }: { onJoin: () => void }) {
  return <section className="flex min-h-screen flex-col bg-blitz pb-16 text-cream">
    <header className="flex items-center justify-between px-5 pt-5"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-lime text-xs font-extrabold text-blitz">K</span><b className="text-sm">Kweza · Friday Blitz</b></div><span className="text-xs font-semibold text-cream/50">Event #4</span></header>
    <div className="px-5 pt-8"><p className="text-xs font-bold uppercase text-lime">You just placed</p><h1 className="mt-1 text-[82px] font-extrabold leading-none"><span className="align-top text-2xl text-cream/60">Nº</span>12</h1><p className="font-semibold text-cream/70">out of 214 sharp players tonight</p></div>
    <div className="relative mt-7 h-56 px-5"><div className="absolute inset-x-7 top-1 rotate-[-5deg] rounded-xl border border-cream/10 bg-cream/10 px-5 py-4 text-xs text-cream/50">OddOneOut · 1,240 pts</div><div className="absolute inset-x-7 top-8 rotate-[3deg] rounded-xl border border-cream/10 bg-cream/15 px-5 py-4 text-xs text-cream/60">CheckMate · 1,860 pts</div><div className="ticket-rise absolute inset-x-5 top-14 overflow-hidden rounded-xl bg-ink shadow-2xl"><div className="flex"><div className="flex-1 p-5"><p className="text-[10px] font-bold uppercase text-cream/45">Tonight's score</p><b className="text-2xl">4,010 points</b><p className="mt-1 text-xs text-cream/40">Top 6% of the room</p></div><div className="ticket-perf w-4 opacity-30"/><div className="grid w-20 place-content-center text-center"><b className="text-lg text-lime">#12</b><span className="text-[9px] text-cream/40">RANK</span></div></div><div className="border-t border-dashed border-cream/15 px-5 py-3 text-[11px] font-semibold text-cream/50">This rank is your ticket to the weekly board</div></div></div>
    <p className="px-5 text-sm font-semibold leading-relaxed text-cream/80">You're knocking on the top 10. Turn tonight's momentum into <span className="text-lime">real cash in your bank.</span></p>
    <div className="mt-auto px-5 pt-6"><button onClick={onJoin} className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-4 font-extrabold text-ink">Join the weekly board <ChevronRight className="size-4"/></button><button className="mt-2 w-full py-2 text-sm font-semibold text-cream/50">Maybe later</button></div>
  </section>
}
