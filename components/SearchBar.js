'use client';

import { useState } from 'react';
import Link from 'next/link';

const LOCATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];
const PROPERTY_TYPES = ['Apartment', 'Independent House', 'Villa', 'Plot', 'Commercial', 'Studio'];
const PRICE_RANGES = [
  { label: 'Any', min: 0, max: null },
  { label: 'Under 50L', min: 0, max: 50 },
  { label: '50L - 1Cr', min: 50, max: 100 },
  { label: '1Cr - 2Cr', min: 100, max: 200 },
  { label: '2Cr+', min: 200, max: null },
];

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-4 text-sm font-semibold text-neutral-700">Search properties</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select city</option>
            {LOCATIONS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Property type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Any type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Budget (Lakhs)</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {PRICE_RANGES.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Link
            href="/listings"
            className="btn-primary w-full justify-center sm:w-auto"
          >
            Search
          </Link>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Search is UI-only in this prototype. Use Listings to see all properties.
      </p>
    </div>
  );
}
