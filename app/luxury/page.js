import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';

async function getProperties() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/properties?category=luxury`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function LuxuryPage() {
  const properties = await getProperties();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Luxury Properties</h1>
          <p className="mt-1 text-neutral-600">
            Premium homes and high-budget listings (₹1 Crore and above).
          </p>
        </div>
        <p className="mb-6 text-sm text-neutral-500">{properties.length} luxury listings</p>

        {properties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-neutral-500">No luxury properties in this range yet.</p>
            <a href="/listings" className="mt-4 inline-block text-primary hover:underline">View all listings</a>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
