import Spinner from '@/components/common/Spinner'; // Ensure you have this component

export default function LoadingHomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"> {/* Adjust min-height as needed */}
      <Spinner size="lg" />
      <p className="mt-4 text-xl text-gray-700">Loading exciting destinations...</p>
    </div>
  );
}