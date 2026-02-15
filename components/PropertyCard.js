import Link from 'next/link';
import Image from 'next/image';

export default function PropertyCard({ property }) {
  const { _id, title, price, location, bhk, propertyType, area, image, listingType, status, verified } = property;
  const isRent = listingType === 'Rent';
  const displayPrice = isRent
    ? `₹${(price / 1000).toFixed(0)}K/mo`
    : price >= 10000000
      ? `₹${(price / 10000000).toFixed(1)} Cr`
      : `₹${(price / 100000).toFixed(1)} L`;

  return (
    <Link href={`/property/${_id}`} className="card block">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <Image
          src={image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded bg-primary px-2 py-1 text-xs font-medium text-white">
          {propertyType}
        </span>
        {verified && (
          <span className="absolute left-3 top-10 rounded bg-green-600 px-2 py-1 text-xs font-medium text-white">
            Verified
          </span>
        )}
        {status && (
          <span className="absolute right-3 top-3 rounded bg-white/90 px-2 py-1 text-xs font-medium text-neutral-700 shadow">
            {status}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-primary">{displayPrice}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-medium text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{location}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-neutral-600">
          <span>{bhk} BHK</span>
          {area > 0 && <span>{area} sq.ft</span>}
          {isRent && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-800">Rent</span>}
        </div>
        <p className="mt-3 text-sm font-medium text-primary">View Details →</p>
      </div>
    </Link>
  );
}
