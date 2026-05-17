export default function Spinner({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}