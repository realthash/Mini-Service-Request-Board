import Link from 'next/link';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-black mb-4">404</p>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex justify-center mt-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Back to Home"
          >
            <IoArrowBackCircleOutline size={48} />
          </Link>
        </div>
      </div>
    </main>
  );
}