'use client';

import { useState } from 'react';

const CITIES = ['Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Delhi', 'Kolkata', 'Gurgaon', 'Noida'];
const PROPERTY_TYPES = [
  { label: 'Flat', value: 'flat' },
  { label: 'House/Villa', value: 'villa' },
  { label: 'Plot', value: 'plot' },
];
const BHK_OPTIONS = [1, 2, 3, 4, 5];
const BUDGET_MIN = ['5 Lac', '10 Lac', '20 Lac', '50 Lac', '1 Cr', '1.5 Cr', '2 Cr', '3 Cr', '5 Cr'];
const BUDGET_MAX = ['10 Lac', '20 Lac', '50 Lac', '1 Cr', '1.5 Cr', '2 Cr', '3 Cr', '5 Cr', '10 Cr', '20 Cr'];

export default function HeroSearch() {
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bhk, setBhk] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');

  const searchParams = new URLSearchParams();
  if (city) searchParams.set('city', city);
  if (propertyType) searchParams.set('type', propertyType);
  if (bhk) searchParams.set('bhk', String(bhk));
  const query = searchParams.toString();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg sm:p-6">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
        Search property
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label className="mb-1 block text-xs font-medium text-neutral-600">Location</label>
          <input
            type="text"
            placeholder="City, Locality, Project name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-600">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-600">BHK</label>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Any</option>
            {BHK_OPTIONS.map((n) => (
              <option key={n} value={n}>{n} BHK</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-600">Budget Min</label>
          <select
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Min</option>
            {BUDGET_MIN.map((b) => (
              <option key={b} value={b}>₹{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-600">Budget Max</label>
          <select
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Max</option>
            {BUDGET_MAX.map((b) => (
              <option key={b} value={b}>₹{b}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <a
            href={query ? `/listings?${query}` : '/listings'}
            className="btn-primary w-full justify-center py-3 text-base"
          >
            Search
          </a>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Popular: {CITIES.slice(0, 5).map((c) => (
          <a key={c} href={`/listings?city=${encodeURIComponent(c)}`} className="text-primary hover:underline">
            {c}
          </a>
        )).reduce((acc, el, i) => (i === 0 ? [el] : [...acc, ', ', el]), [])}
      </p>
    </div>
  );
}
