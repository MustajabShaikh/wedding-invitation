import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import referenceImg from './assets/invitation-reference.png';

const wedding = {
  bride: 'Alshifa',
  groom: 'Mo. Zaid',
};

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

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
          <div className="door door-left"><div className="door-inner"><div className="door-arch"><span>✧</span><b>الرحمن الرحيم</b><span>❋</span></div><div className="door-pattern">◇<br />✦<br />◇</div><div className="door-knob" /></div></div>
          <div className="door door-right"><div className="door-inner"><div className="door-arch"><span>✧</span><b>بسم الله</b><span>❋</span></div><div className="door-pattern">◇<br />✦<br />◇</div><div className="door-knob" /></div></div>
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
      <div className="invitation-image-card">
        <img
          src={referenceImg}
          alt={`Wedding invitation of ${wedding.bride} and ${wedding.groom}`}
          className="invitation-image"
        />
      </div>
      <div className="invitation-actions">
        <button onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
    </section>}
  </main>;
}
