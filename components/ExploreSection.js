const CARDS = [
  {
    title: 'Verified Properties',
    description: 'Explore verified listings with quality checks',
    href: '/verified',
    icon: '✓',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  {
    title: 'Upcoming Projects',
    description: 'New projects and under-construction properties',
    href: '/new-projects',
    icon: '🏗',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
  },
  {
    title: 'Individual Houses / Villas',
    description: 'Independent houses and villas',
    href: '/houses-villas',
    icon: '🏠',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
  {
    title: 'Luxury Properties',
    description: 'Premium homes and high-budget listings',
    href: '/luxury',
    icon: '✨',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
  },
];

export default function ExploreSection() {
  return (
    <section className="py-10">
      <h2 className="mb-6 text-xl font-bold text-neutral-900">
        We&apos;ve got properties for everyone
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <span className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${card.bg} ${card.text}`}>
              {card.icon}
            </span>
            <h3 className="font-semibold text-neutral-900 group-hover:text-primary">{card.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">{card.description}</p>
            <span className="mt-3 text-sm font-medium text-primary">Explore →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
