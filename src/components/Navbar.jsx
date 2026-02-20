import { Link, useLocation } from 'react-router-dom';

function LogoIcon() {
  return (
    <svg width="36" height="32" viewBox="0 0 52 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexagon */}
      <path
        d="M18 4L6 11v18l12 7 12-7V11L18 4z"
        stroke="#1E293B"
        strokeWidth="2"
        fill="none"
      />
      {/* Orange I bar */}
      <rect x="15.5" y="13" width="5" height="14" rx="1" fill="#F97316" />
      {/* Circuit lines from right side of hexagon */}
      <line x1="30" y1="15" x2="38" y2="11" stroke="#1E293B" strokeWidth="1.5" />
      <line x1="38" y1="11" x2="46" y2="11" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="46" cy="11" r="2" fill="#1E293B" />
      <line x1="30" y1="20" x2="38" y2="20" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="38" cy="20" r="2" fill="#1E293B" />
      <line x1="30" y1="25" x2="38" y2="29" stroke="#1E293B" strokeWidth="1.5" />
      <line x1="38" y1="29" x2="46" y2="29" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="46" cy="29" r="2" fill="#1E293B" />
    </svg>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-dark">
          <LogoIcon />
          <span className="text-dark">
            INF<span className="text-primary">.</span>NOVA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-dark' : 'text-gray-500 hover:text-dark'
            }`}
          >
            Courses
          </Link>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-dark transition-colors">
            About
          </a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-dark transition-colors">
            Contact
          </a>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
            Sign In
          </a>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Enroll Now
          </Link>
        </div>

        <button className="sm:hidden text-gray-600" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
