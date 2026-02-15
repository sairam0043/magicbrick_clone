'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const PROPERTY_TYPES = ['Apartment', 'Independent House', 'Villa', 'Plot', 'Commercial', 'Studio'];

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    city: '',
    propertyType: 'Apartment',
    bhk: 2,
    area: '',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    featured: false,
    verified: false,
    listingType: 'Buy',
    status: 'Ready to Move',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        area: Number(form.area) || 0,
        bhk: Number(form.bhk) || 1,
      };
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add property');
      }
      const created = await res.json();
      router.push(`/property/${created._id}`);
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-neutral-900">Add new property</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. 3 BHK Apartment in Koramangala"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe the property, amenities, etc."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Price (₹) * {form.listingType === 'Rent' && '(per month)'}
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min={0}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={form.listingType === 'Rent' ? 'e.g. 25000' : 'e.g. 7500000'}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Area (sq.ft)</label>
              <input
                type="number"
                name="area"
                value={form.area}
                onChange={handleChange}
                min={0}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. 1500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Location / Address *</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Koramangala 5th Block"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">City *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Bangalore"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Listing type *</label>
              <select
                name="listingType"
                value={form.listingType}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Property type *</label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">BHK *</label>
              <input
                type="number"
                name="bhk"
                value={form.bhk}
                onChange={handleChange}
                required
                min={1}
                max={10}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
            />
            <label htmlFor="featured" className="text-sm text-neutral-700">Show in featured on home</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="verified"
              id="verified"
              checked={form.verified}
              onChange={handleChange}
              className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
            />
            <label htmlFor="verified" className="text-sm text-neutral-700">Verified listing (quality checks)</label>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? 'Adding...' : 'Add property'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/listings')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
