import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Menu, X, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Research', path: '/research' },
  { label: 'Data & Evidence', path: '/data' },
  { label: 'Land Insights', path: '/land-insights' },
  { label: 'Policy Innovation', path: '/policy' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/research?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-nav' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm leading-none">भू</span>
            </div>
            <div>
              <div className="text-lg font-black text-forest-900 leading-tight tracking-tight">BhoomiSetu</div>
              <div className="text-[10px] text-gray-400 leading-tight font-medium tracking-wider uppercase">Land Governance Platform</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-forest-800 bg-forest-50'
                    : 'text-gray-600 hover:text-forest-800 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-500 hover:text-forest-800 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* User */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-gray-50">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-forest-800 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard size={15} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 px-4 py-2 bg-forest-800 text-white text-sm font-semibold rounded-lg hover:bg-forest-900 transition-colors">
                <User size={15} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="pb-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search research, datasets, policies, case studies..."
                className="input-field pl-10"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white py-2 animate-slide-up">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-forest-800 bg-forest-50'
                  : 'text-gray-600 hover:text-forest-800 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
