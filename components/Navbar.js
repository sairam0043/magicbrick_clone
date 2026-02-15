'use client';

const navLinks = [
  { href: '/', label: 'Buy' },
  { href: '/rent', label: 'Rent' },
  { href: '/new-projects', label: 'New Projects' },
  { href: '/listings?type=pg', label: 'PG' },
  { href: '/listings?type=plot', label: 'Plot' },
  { href: '/listings?type=commercial', label: 'Commercial' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
              MB
            </span>
            <span className="hidden sm:inline">MagicBricks</span>
          </a>

          <nav className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="rounded px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                {label}
              </a>
            ))}
            <a
              href="/add"
              className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Post Property FREE
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
