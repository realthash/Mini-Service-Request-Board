import Link from 'next/link';

// Status badge colours — each status gets a distinct colour
const statusStyles = {
  'Open': 'bg-green-100 text-green-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Closed': 'bg-gray-100 text-gray-600',
};

// Category badge colours
const categoryStyles = {
  'Plumbing': 'bg-blue-100 text-blue-800',
  'Electrical': 'bg-purple-100 text-purple-800',
  'Painting': 'bg-pink-100 text-pink-800',
  'Joinery': 'bg-orange-100 text-orange-800',
};

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer h-full">

        {/* Top row — category + status badges */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[job.category] || 'bg-gray-100 text-gray-600'}`}>
            {job.category || 'Uncategorised'}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[job.status]}`}>
            {job.status}
          </span>
        </div>

        {/* Job title */}
        <h2 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
          {job.title}
        </h2>

        {/* Description preview */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Bottom row — location + date */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
          <span>📍 {job.location || 'Location not specified'}</span>
          <span>
            {job.createdAt
              ? new Date(job.createdAt).toLocaleDateString('en-GB')
              : 'N/A'}
          </span>
        </div>

      </div>
    </Link>
  );
}