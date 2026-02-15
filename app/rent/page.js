import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';

async function getProperties(searchParams = {}) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const params = new URLSearchParams({ ...searchParams, listingType: 'Rent' });
    const res = await fetch(`${base}/api/properties?${params}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function RentPage({ searchParams }) {
  const properties = await getProperties(searchParams);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">Properties for Rent</h1>
        <p className="mb-8 text-neutral-600">{properties.length} rental listings</p>

        {properties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-neutral-500">No rental properties yet.</p>
            <a href="/add" className="mt-4 inline-block btn-primary">Post Property FREE</a>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
