'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import JobCard from './components/JobCard';
import CategoryFilter from './components/CategoryFilter';
import Spinner from './components/Spinner';
import { useSearchParams } from 'next/navigation';

function HomePageContent() {

  // ── State ────────────────────────────────────────────────
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const searchParams = useSearchParams();
  const justCreated = searchParams.get('created') === 'true';

  // ── Effects ──────────────────────────────────────────────
  useEffect(() => {
    fetchJobs();
  }, [selectedCategory]);

  // ── Handlers ─────────────────────────────────────────────
  async function fetchJobs() {
    setLoading(true);
    setError(null);

    try {
      // Build URL — add category param only if not 'All'
      const url = selectedCategory === 'All'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?category=${selectedCategory}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch jobs. Please try again.');
      }

      const data = await response.json();
      setJobs(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <main className="bg-slate-100">

        {/* Header */}
        <div className="bg-blue-200 border-b border-gray-200 px-6 py-5">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Service Request Board
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Browse open home service requests
              </p>
            </div>
            <Link
              href="/jobs/new"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Post New Request
            </Link>
          </div>
        </div>

        {/* Loading state — full screen */}
        {loading && <Spinner message="Loading jobs..." />}

        {/* Main content */}
        {!loading && (
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* Success banner */}
          {justCreated && (
            <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              Job request posted successfully!
            </div>
          )}

          {/* Filter row */}
          <div className="flex items-center justify-between mb-6">
            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
            {!loading && (
              <p className="text-sm text-gray-600 font-semibold">
                {jobs.length} {jobs.length === 1 ? 'request' : 'requests'} found
              </p>
            )}
          </div>

          {/* Error state */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">No jobs found.</p>
              <Link
                href="/jobs/new"
                className="mt-3 inline-block text-blue-600 text-sm hover:underline"
              >
                Be the first to post a request
              </Link>
            </div>
          )}

          {/* Success state — job grid */}
          {!loading && !error && jobs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

        </div>
        )}
      </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}
