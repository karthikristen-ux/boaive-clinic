'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-background)]">
      <div className="container-main flex items-center justify-between py-2.5">
        <div className="flex items-center gap-3">
          <span className="demo-badge">
            <Sparkles size={10} />
            Live Demo
          </span>
          <span className="hidden sm:inline text-xs opacity-60">
            This is a demo website platform
          </span>
        </div>
        <Link
          href="/customize"
          className="flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity"
        >
          Customize this website
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
