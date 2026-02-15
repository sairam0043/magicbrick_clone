import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';

async function getProperties() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/properties?category=upcoming`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function NewProjectsPage() {
  const projects = await getProperties();
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  let all = [];
  try {
    const resAll = await fetch(`${base}/api/properties`, { cache: 'no-store' });
    if (resAll.ok) {
      all = await resAll.json();
    }
  } catch {
    // Handle fetch failure during static generation
  }
  const displayList = projects.length > 0 ? projects : all.slice(0, 8);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Upcoming Projects</h1>
          <p className="mt-1 text-neutral-600">
            New projects and under-construction properties
          </p>
        </div>
        <p className="mb-6 text-sm text-neutral-500">{displayList.length} projects</p>

        {displayList.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayList.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-neutral-500">No new projects listed yet.</p>
            <a href="/add" className="mt-4 inline-block btn-primary">Post Property FREE</a>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
