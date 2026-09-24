'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, ArrowRight } from 'lucide-react';
import { resultCases } from '@/config/site-config';

export default function BeforeAfter({ showHeading = true }: { showHeading?: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [activeId, setActiveId] = useState(resultCases[0].id);
  const [pos, setPos] = useState(50);
  const active = resultCases.find(c => c.id === activeId) ?? resultCases[0];

  const move = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <section className="section">
      <div className="container">
        {showHeading && (
          <div className="section-head">
            <p className="eyebrow">Patient results</p>
            <h2 className="h2">See the difference.</h2>
            <p className="lead">Drag the slider to compare before and after for each department.</p>
          </div>
        )}

        <div className="tabs" role="tablist" aria-label="Result categories">
          {resultCases.map(c => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === activeId}
              className="tab"
              onClick={() => { setActiveId(c.id); setPos(50); }}
            >
              {c.category}
            </button>
          ))}
        </div>

        <div className="ba" style={{ marginTop: 24 }}>
          <div
            ref={stageRef}
            className="ba-stage"
            onPointerDown={e => {
              dragging.current = true;
              try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
              move(e.clientX);
            }}
            onPointerMove={e => { if (dragging.current) move(e.clientX); }}
            onPointerUp={() => { dragging.current = false; }}
            onPointerCancel={() => { dragging.current = false; }}
            role="slider"
            aria-label="Before and after comparison"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 5));
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.before} alt={`${active.category} before treatment`} />
            <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.after} alt={`${active.category} after treatment`} />
            </div>
            <span className="ba-tag" style={{ left: 12 }}>Before</span>
            <span className="ba-tag" style={{ right: 12 }}>After</span>
            <div className="ba-line" style={{ left: `${pos}%` }}>
              <div className="ba-knob"><ArrowLeftRight size={18} /></div>
            </div>
          </div>

          <div>
            <h3 className="h3" style={{ marginBottom: 8 }}>{active.title}</h3>
            <dl className="ba-facts">
              <div><dt>Treatment</dt><dd>{active.treatment}</dd></div>
              <div><dt>Duration</dt><dd>{active.duration}</dd></div>
            </dl>
            <p className="ba-note">Individual results vary. Photos shared with patient consent.</p>
            <div style={{ marginTop: 20 }}>
              <Link href="/appointment" className="link-arrow">
                Book a consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
