import { useState } from 'react';
import { CalendarDays, Clock3, MapPin, Heart, RotateCcw, Volume2 } from 'lucide-react';

const wedding = {
  bride: 'Alshifa',
  groom: 'Mo. Zaid',
  events: [
    { name: 'Haldi', date: '27 November 2026', time: '10:00 AM', venue: 'Opp. Urdu School, Khambhat', tone: 'haldi', symbol: '✿', note: 'A day of colors, love & blessings' },
    { name: 'Nikah', date: '28 November 2026', time: '3:00 PM', venue: 'Mansuri Hall, Khambhat', tone: 'nikah', symbol: '☾', note: 'A sacred bond for a lifetime' },
    { name: 'Reception', date: '29 November 2026', time: '8:00 PM', venue: 'M.D. Farm, Danilimda, Khambat', tone: 'reception', symbol: '✧', note: 'A celebration of love & togetherness' },
  ],
};

function EventCard({ event }) {
  return <article className={`event-card ${event.tone}`}>
    <div className="event-symbol" aria-hidden="true">{event.symbol}</div>
    <h3>{event.name}</h3>
    <p className="event-note">{event.note}</p>
    <div className="event-detail"><CalendarDays size={17} /><span>{event.date}</span></div>
    <div className="event-detail"><Clock3 size={17} /><span>{event.time}</span></div>
    <div className="event-detail venue"><MapPin size={17} /><span>{event.venue}</span></div>
  </article>;
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const handleOpen = () => {
    if (isOpening || opened) return;
    setIsOpening(true);
    setTimeout(() => {
      setOpened(true);
      setIsOpening(false);
    }, 1300);
  };

  const handleReset = () => {
    setOpened(false);
    setIsOpening(false);
  };

  return <main className={`site-shell ${opened ? 'is-open' : ''} ${isOpening ? 'is-opening' : ''}`}>
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    {!opened && <section className={`welcome ${isOpening ? 'opening' : ''}`} aria-label="Open wedding invitation">
      <div className="welcome-top"><span className="crescent">☾</span><span className="tiny-rule" /><p>YOU ARE CORDIALLY INVITED</p></div>
      <div
        className={`door-scene ${isOpening ? 'is-open' : ''}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Click the door to open wedding invitation"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); }}
      >
        <div className="door-frame">
          <div className="door door-left"><div className="door-inner"><div className="door-arch"><span>✧</span><b>بسم الله</b><span>❋</span></div><div className="door-pattern">◇<br />✦<br />◇</div><div className="door-knob" /></div></div>
          <div className="door door-right"><div className="door-inner"><div className="door-arch"><span>✧</span><b>الرحمن الرحيم</b><span>❋</span></div><div className="door-pattern">◇<br />✦<br />◇</div><div className="door-knob" /></div></div>
          <div className="door-glow" />
          <div className="door-portal">
            <span className="portal-crescent">☾</span>
            <p className="portal-text">أهلاً وسهلاً</p>
            <span className="portal-sub">Welcome</span>
          </div>
        </div>
      </div>
      <p className="welcome-kicker">THE WEDDING CELEBRATION OF</p>
      <h1>{wedding.bride}<span>&</span>{wedding.groom}</h1>
      <div
        className="door-hint-pill"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Click the door to open invitation"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); }}
      >
        <span className="sparkle">✧</span>
        <span className="hint-text">{isOpening ? 'Opening Royal Doors...' : 'Click the doors to open'}</span>
        <span className="sparkle">✧</span>
      </div>
      <p className="welcome-foot">27 · 28 · 29 NOVEMBER 2026</p>
    </section>}

    {opened && <section className="invitation-wrap" aria-label="Wedding invitation">
      <button className="back-button" onClick={handleReset}><RotateCcw size={15} /> Replay door animation</button>
      <div className="invitation-card">
        <div className="card-ornament top-ornament">✧ ❋ ✧</div>
        <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="translation">IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL</p>
        <div className="gold-line"><span>✦</span></div>
        <p className="intro">With the blessings of Allah and the love of our families,<br className="desktop-break" /> we invite you to celebrate the wedding of</p>
        <h2>{wedding.bride}<span>and</span>{wedding.groom}</h2>
        <p className="welcome-message">Your presence will make our celebrations more special.<br className="desktop-break" /> We look forward to sharing these beautiful moments with you.</p>
        <div className="events-grid">{wedding.events.map(event => <EventCard key={event.name} event={event} />)}</div>
        <div className="closing"><span>❋</span><p>WE WOULD BE HONORED BY YOUR PRESENCE<br />AT ALL THREE EVENTS</p><span>❋</span></div>
        <div className="mosque-silhouette" aria-hidden="true">☾　♜　♙　♜　☾</div>
      </div>
      <div className="invitation-actions"><button onClick={() => window.print()}>Print / Save as PDF</button><button className="secondary-action" onClick={() => setShowReference(v => !v)}>{showReference ? 'Hide original artwork' : 'View original artwork'}</button></div>
      {showReference && <div className="reference-wrap"><img src="/src/assets/invitation-reference.png" alt="Original square wedding invitation artwork" /></div>}
      <p className="edit-hint">To personalize the invitation, edit the <code>wedding</code> object in <code>src/WeddingInvitation.jsx</code>.</p>
    </section>}
  </main>;
}
