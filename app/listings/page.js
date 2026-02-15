import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';

async function getProperties(searchParams = {}) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${base}/api/properties?${params}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function ListingsPage({ searchParams }) {
  const filters = { listingType: 'Buy', ...searchParams };
  const properties = await getProperties(filters);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">Properties for Sale</h1>
        <p className="mb-8 text-neutral-600">{properties.length} listings</p>

        {properties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-neutral-500">No properties match your criteria.</p>
            <a href="/listings" className="mt-4 inline-block text-primary hover:underline">View all</a>
            <span className="mx-2">|</span>
            <a href="/add" className="inline-block btn-primary mt-4">Post Property FREE</a>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
