import Navbar from '@/components/Navbar';
import HeroSearch from '@/components/HeroSearch';
import ExploreSection from '@/components/ExploreSection';
import PropertyCard from '@/components/PropertyCard';
import AdviceTools from '@/components/AdviceTools';
import Footer from '@/components/Footer';

async function getProperties(filters = {}) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const params = new URLSearchParams(filters);
    const res = await fetch(`${base}/api/properties?${params}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [allProperties, featuredProperties] = await Promise.all([
    getProperties(),
    getProperties(),
  ]);
  const featured = featuredProperties.filter((p) => p.featured).slice(0, 6);
  const popular = featured.length >= 6 ? featured : [...featured, ...allProperties.slice(0, 6 - featured.length)];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Properties for the Global Indian!
          </h1>
          <p className="mt-2 text-neutral-600">
            Buy, Rent &amp; Sell properties across India
          </p>
        </section>

        <section className="mb-10">
          <HeroSearch />
        </section>

        <ExploreSection />

        <section className="border-t border-neutral-200 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">Featured Projects</h2>
            <a href="/listings" className="text-sm font-medium text-primary hover:underline">
              See all Projects →
            </a>
          </div>
          {popular.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popular.slice(0, 6).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-12 text-center">
              <p className="text-neutral-500">No properties yet. Seed data or add from Add Property.</p>
              <a href="/add" className="mt-4 inline-block btn-primary">Post Property FREE</a>
            </div>
          )}
        </section>

        <section className="border-t border-neutral-200 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">Popular Owner Properties</h2>
            <a href="/listings" className="text-sm font-medium text-primary hover:underline">
              See all Properties →
            </a>
          </div>
          {allProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allProperties.slice(0, 8).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No listings yet.</p>
          )}
        </section>

        <AdviceTools />
      </main>
      <Footer />
    </>
  );
}
