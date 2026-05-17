'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

const statusStyles = {
  'Open':        'bg-green-100 text-green-800 border-green-200',
  'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Closed':      'bg-gray-100 text-gray-600 border-gray-200',
};

const categoryStyles = {
  'Plumbing':   'bg-blue-100 text-blue-800',
  'Electrical': 'bg-purple-100 text-purple-800',
  'Painting':   'bg-pink-100 text-pink-800',
  'Joinery':    'bg-orange-100 text-orange-800',
};

export default function JobDetailPage() {

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // ── State ────────────────────────────────────────────────
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Effects ──────────────────────────────────────────────
  useEffect(() => {
    fetchJob();
  }, [id]);

  // ── Handlers ─────────────────────────────────────────────
  async function fetchJob() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch job.');
      }

      const data = await response.json();
      setJob(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(newStatus) {
    setUpdating(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update status.');
      }

      const updatedJob = await response.json();
      setJob(updatedJob);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete job.');
      }

      router.push('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  // ── Render: Loading state ────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading job details...</p>
      </main>
    );
  }

  // ── Render: Error state ──────────────────────────────────
  if (error && !job) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to all jobs
          </Link>
        </div>
      </main>
    );
  }

  // ── Render: Success state ────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ← Back
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Job Details</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

          {/* Error banner (for update/delete errors while job is still visible) */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Category + Status row */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[job.category] || 'bg-gray-100 text-gray-600'}`}>
              {job.category || 'Uncategorised'}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[job.status]}`}>
              {job.status}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {job.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {job.description}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-t border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Location</p>
              <p className="text-sm text-gray-700">
                {job.location || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Date Posted</p>
              <p className="text-sm text-gray-700">
                {job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Contact Name</p>
              <p className="text-sm text-gray-700">
                {job.contactName || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Contact Email</p>
              <p className="text-sm text-gray-700">
                {job.contactEmail || 'Not provided'}
              </p>
            </div>
          </div>

          {/* Update Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Status
            </label>
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {updating && (
              <span className="ml-2 text-xs text-gray-400">Updating...</span>
            )}
          </div>

          {/* Delete section */}
          <div className="pt-4 border-t border-gray-100">
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Delete this job
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-700">
                  Are you sure? This cannot be undone.
                </p>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {deleting ? 'Deleting...' : 'Yes, delete'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={deleting}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}