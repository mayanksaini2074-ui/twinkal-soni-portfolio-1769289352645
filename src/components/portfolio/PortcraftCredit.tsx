'use client';

// Self-contained on purpose: this exact file is also pushed into previously
// generated portfolio repos, which only share a minimal Next.js + Tailwind setup.
export default function PortcraftCredit() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 px-6 py-6 text-center text-sm text-slate-400">
      <a
        href="https://portcraft.in"
        target="_blank"
        rel="noopener"
        className="transition-colors hover:text-white"
      >
        Powered by <span className="font-semibold text-slate-200">portcraft.in</span>
      </a>
    </footer>
  );
}
