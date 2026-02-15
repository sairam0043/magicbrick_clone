'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-bold text-neutral-900">Something went wrong</h1>
      <p className="mt-2 text-sm text-neutral-600">{error?.message || 'An error occurred'}</p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
