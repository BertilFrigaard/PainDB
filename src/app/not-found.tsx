export default function NotFound() {
    return (
        <div className="h-[80vh] flex flex-col items-center justify-center p-10 text-center bg-white text-gray-800">
            <h2 className="text-3xl font-bold mt-4 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8">The page you’re looking for doesn’t exist or has been moved.</p>
        </div>
    );
}
