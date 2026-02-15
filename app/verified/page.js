import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';

async function getProperties() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/properties?category=verified`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function VerifiedPage() {
  const properties = await getProperties();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Verified
          </span>
          <h1 className="mt-2 text-2xl font-bold text-neutral-900">Verified Properties</h1>
          <p className="mt-1 text-neutral-600">
            Explore verified listings with quality checks and genuine owner details.
          </p>
        </div>
        <p className="mb-6 text-sm text-neutral-500">{properties.length} verified listings</p>

        {properties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-neutral-500">No verified properties yet.</p>
            <a href="/listings" className="mt-4 inline-block text-primary hover:underline">View all listings</a>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
