import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

async function getProperty(id) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/properties/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PropertyDetailPage({ params }) {
  const property = await getProperty(params.id);

  if (!property) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Property not found</h1>
          <Link href="/listings" className="mt-4 inline-block btn-primary">Back to listings</Link>
        </main>
      </>
    );
  }

  const isRent = property.listingType === 'Rent';
  const displayPrice = isRent
    ? `₹${property.price?.toLocaleString()}/month`
    : property.price >= 10000000
      ? `₹${(property.price / 10000000).toFixed(1)} Crore`
      : `₹${(property.price / 100000).toFixed(1)} Lakh`;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={isRent ? '/rent' : '/listings'} className="mb-6 inline-flex text-sm text-primary hover:underline">
          ← Back to {isRent ? 'rentals' : 'listings'}
        </Link>

        <div className="card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full bg-neutral-100 lg:aspect-auto lg:min-h-[400px]">
              <Image
                src={property.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'}
                alt={property.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-between p-6 lg:p-8">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-primary/10 px-2 py-1 text-sm font-medium text-primary">
                    {property.propertyType}
                  </span>
                  {property.listingType && (
                    <span className="rounded bg-neutral-100 px-2 py-1 text-sm font-medium text-neutral-700">
                      {property.listingType}
                    </span>
                  )}
                  {property.status && (
                    <span className="rounded bg-amber-100 px-2 py-1 text-sm font-medium text-amber-800">
                      {property.status}
                    </span>
                  )}
                </div>
                <h1 className="mt-3 text-2xl font-bold text-neutral-900 lg:text-3xl">
                  {property.title}
                </h1>
                <p className="mt-2 text-2xl font-semibold text-primary">{displayPrice}</p>
                <p className="mt-2 flex items-center text-neutral-600">
                  <span>{property.location}, {property.city}</span>
                </p>
                <div className="mt-4 flex gap-4 text-sm">
                  <span className="rounded bg-neutral-100 px-3 py-1.5 font-medium">{property.bhk} BHK</span>
                  {property.area > 0 && (
                    <span className="rounded bg-neutral-100 px-3 py-1.5 font-medium">{property.area} sq.ft</span>
                  )}
                </div>
                <div className="mt-6 border-t border-neutral-200 pt-6">
                  <h2 className="text-sm font-semibold text-neutral-700">Description</h2>
                  <p className="mt-2 text-neutral-600 whitespace-pre-wrap">{property.description}</p>
                </div>
              </div>
              <div className="mt-8 flex gap-3 border-t border-neutral-200 pt-6">
                <a href="#" className="btn-primary flex-1 justify-center">Contact owner</a>
                <a href="#" className="btn-secondary flex-1 justify-center">Save</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
