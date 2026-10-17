import { useState } from "react";
import { CalendarDays, Clock3, MapPin, RotateCcw, Printer, ArrowDown } from "lucide-react";

const wedding = {
  bride: "Alshifa Banu",
  groom: "Mo.Zaid",
  events: [
    { name: "Haldi", date: "2026-11-27", time: "10:00 AM", venue: "Opp. urdu school, Khambhat.", theme: "haldi", symbol: "✺", tagline: "A day of colors, love & blessings" },
    { name: "Nikah", date: "2026-11-28", time: "3:00 PM", venue: "Mansuri Hall, Khambhat.", theme: "nikah", symbol: "☾", tagline: "A sacred bond for a lifetime" },
    { name: "Reception", date: "2026-11-29", time: "8:00 PM", venue: "M.D. Farm, Danilimda, Khambat.", theme: "reception", symbol: "✧", tagline: "A celebration of love & togetherness" }
  ]
};

function EventCard({ event, index }) {
  return <article className={`event-card ${event.theme}`} style={{ "--delay": `${index * 140}ms` }}>
    <div className="event-symbol">{event.symbol}</div><p className="event-kicker">THE CELEBRATION</p>
    <h3>{event.name}</h3><p className="event-tagline">{event.tagline}</p><div className="event-rule"><span /></div>
    <div className="detail"><CalendarDays /><div><span>Date</span><strong>{event.date}</strong></div></div>
    <div className="detail"><Clock3 /><div><span>Time</span><strong>{event.time}</strong></div></div>
    <div className="detail"><MapPin /><div><span>Venue</span><strong>{event.venue}</strong></div></div>
  </article>;
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  return <main className={`app ${opened ? "is-open" : ""}`}>
    {!opened && <section className="welcome">
      <div className="welcome-copy"><div className="crescent">☾</div><p className="eyebrow">YOU ARE CORDIALLY INVITED TO</p>
        <h1>Alshifa Banu <span>&amp;</span> Mo.Zaid</h1><p className="subtitle">A celebration of love, faith &amp; forever</p>
        <button className="open-cta" onClick={() => setOpened(true)}><span>✦</span> Open Your Invitation <ArrowDown size={16} /></button><p className="tap">TAP TO OPEN</p>
      </div>
      <div className="door-stage"><div className="door-glow" /><div className="arch">
        <div className="inner-light"><div className="mosque"><i /><b /><i /></div></div>
        <button className="door left" onClick={() => setOpened(true)} aria-label="Open left door"><span className="pattern" /><span className="medallion">✧</span><span className="handle" /></button>
        <button className="door right" onClick={() => setOpened(true)} aria-label="Open right door"><span className="pattern" /><span className="medallion">✧</span><span className="handle" /></button>
        <div className="crown">☾</div>
      </div><div className="step one" /><div className="step two" /></div>
      <p className="welcome-foot">WITH THE BLESSINGS OF ALLAH</p>
    </section>}
    <section className={`invitation ${opened ? "visible" : ""}`} aria-hidden={!opened}>
      <div className="toolbar"><button onClick={() => setOpened(false)}><RotateCcw size={15} /> Close invitation</button><button onClick={() => window.print()}><Printer size={15} /> Print / Save PDF</button></div>
      <div className="paper">
        <span className="corner tl">❋</span><span className="corner tr">❋</span><span className="corner bl">❋</span><span className="corner br">❋</span>
        <header className="invite-header">
          <div className="bismillah" lang="ar" dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
          <p className="translation">IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL</p><div className="divider"><span>✦</span></div>
          <p className="intro">With the blessings of Allah and the love of our families,<br className="desktop" /> we joyfully invite you to celebrate the wedding of</p>
          <h2>{wedding.bride}</h2><p className="family">Daughter of Mo.Rafik Shaikh</p><div className="and"><span /> AND <span /></div>
          <h2 className="groom">{wedding.groom}</h2><p className="family">Son of Mo.Rafik Shaikh</p>
          <p className="note">Your presence will make our celebrations more special.<br className="desktop" /> We look forward to sharing these beautiful moments with you.</p>
        </header>
        <div className="events-heading"><span /> OUR WEDDING CELEBRATIONS <span /></div>
        <div className="events">{wedding.events.map((event, i) => <EventCard key={event.name} event={event} index={i} />)}</div>
        <footer><div className="flourish">❧ ❖ ❧</div><p>WE WOULD BE HONORED BY YOUR PRESENCE</p><p className="footer-sub">AT ALL THREE EVENTS</p><div className="footer-mosque">♜　☾　♜</div><button className="replay" onClick={() => setOpened(false)}><RotateCcw size={14} /> Replay the entrance</button></footer>
      </div>
      <p className="credit">Made with love for Alshifa Banu &amp; Mo.Zaid</p>
    </section>
  </main>;
}