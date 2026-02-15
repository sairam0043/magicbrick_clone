import Link from 'next/link';

const TOP_CITIES = [
  'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Delhi',
  'Kolkata', 'Gurgaon', 'Noida', 'Ahmedabad', 'Navi Mumbai',
];

const PROPERTY_LINKS = [
  { label: 'Flats', slug: 'flat' },
  { label: 'Houses', slug: 'house' },
  { label: 'Plots', slug: 'plot' },
  { label: 'Villas', slug: 'villa' },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Buy property in top cities
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {TOP_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/listings?city=${encodeURIComponent(city)}`}
                    className="text-sm text-neutral-600 hover:text-primary"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Rent in top cities
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {TOP_CITIES.slice(0, 6).map((city) => (
                <li key={city}>
                  <Link
                    href={`/rent?city=${encodeURIComponent(city)}`}
                    className="text-sm text-neutral-600 hover:text-primary"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Property types
            </h3>
            <ul className="mt-4 space-y-2">
              {PROPERTY_LINKS.map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    href={`/listings?type=${slug}`}
                    className="text-sm text-neutral-600 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              List your property
            </h3>
            <p className="mt-4 text-sm text-neutral-600">
              Get genuine leads. Post your property for free on MagicBricks.
            </p>
            <Link
              href="/add"
              className="mt-4 inline-block rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Post Property FREE
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-200 pt-8 text-center text-sm text-neutral-500">
          <p>MagicBricks Clone — Real Estate Prototype. Buy, Sell & Rent Properties in India.</p>
        </div>
      </div>
    </footer>
  );
}
