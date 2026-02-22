import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="min-h-[55vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg text-center bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10">
        <p className="text-primary font-semibold tracking-wide text-sm">404</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-dark">Page Not Found</h1>
        <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
          The page or endpoint you requested does not exist. Please check the URL and try again.
        </p>
        <Link
          to="/"
          className="inline-flex mt-6 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
