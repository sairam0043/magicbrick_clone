import Link from 'next/link';

const TOOLS = [
  {
    title: 'EMI Calculator',
    description: "Know how much you'll pay every month on your loan",
    href: '#',
    cta: 'View now',
  },
  {
    title: 'Best Home Loan Offers',
    description: 'Get the best bank offers curated for your profile',
    href: '#',
    cta: 'View now',
  },
  {
    title: 'Interiors Budget Estimator',
    description: 'Estimate cost of full/partial home interiors',
    href: '#',
    cta: 'View now',
  },
  {
    title: 'Rates & Trends',
    description: 'Property rates and trends in your city',
    href: '#',
    cta: 'View now',
  },
  {
    title: 'Research Insights',
    description: 'Expert insights and research reports on real estate',
    href: '#',
    cta: 'View now',
  },
];

export default function AdviceTools() {
  return (
    <section className="border-t border-neutral-200 py-12">
      <h2 className="mb-6 text-xl font-bold text-neutral-900">Advice & Tools</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {TOOLS.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <h3 className="font-semibold text-neutral-900">{tool.title}</h3>
            <p className="mt-2 text-sm text-neutral-500">{tool.description}</p>
            <span className="mt-3 inline-block text-sm font-medium text-primary">{tool.cta} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
