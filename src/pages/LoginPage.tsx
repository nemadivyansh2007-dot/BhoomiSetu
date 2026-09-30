import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Building } from 'lucide-react';
import { useAuth, type UserRole } from '@/context/AuthContext';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [institution, setInstitution] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all required fields.'); return; }
    if (mode === 'register' && !name) { setError('Please enter your name.'); return; }

    setLoading(true);
    try {
      const ok = mode === 'login'
        ? await login(email, password)
        : await register(name, email, password, role);

      if (ok) navigate('/dashboard');
      else setError('Invalid credentials. Try any email with demo password.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const DEMO_ACCOUNTS = [
    { label: 'Researcher', email: 'researcher@demo.in', password: 'demo123' },
    { label: 'Admin', email: 'admin@demo.in', password: 'demo123' },
    { label: 'Citizen', email: 'citizen@demo.in', password: 'demo123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-forest-950 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">भू</span>
            </div>
            <div className="text-left">
              <div className="text-xl font-black text-white">BhoomiSetu</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">Land Governance Platform</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tab Toggle */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${mode === 'login' ? 'text-forest-800 border-b-2 border-forest-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${mode === 'register' ? 'text-forest-800 border-b-2 border-forest-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            {/* Demo shortcut */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5">
              <p className="text-xs font-semibold text-blue-700 mb-2">Demo Accounts — click to fill:</p>
              <div className="flex gap-2 flex-wrap">
                {DEMO_ACCOUNTS.map(a => (
                  <button
                    key={a.label}
                    onClick={() => { setEmail(a.email); setPassword(a.password); setMode('login'); }}
                    className="text-xs px-2.5 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-600 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-field pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password *</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'login' ? 'Your password' : 'Create a password'}
                    className="input-field pl-10 pr-10"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">I am a...</label>
                    <div className="grid grid-cols-3 gap-2">
                      {([['citizen', 'Citizen'], ['researcher', 'Researcher'], ['admin', 'Administrator']] as [UserRole, string][]).map(([v, l]) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setRole(v)}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${role === v ? 'bg-forest-800 text-white border-forest-800' : 'border-gray-200 text-gray-600 hover:border-forest-400'}`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(role === 'researcher' || role === 'admin') && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Institution / Organization</label>
                      <div className="relative">
                        <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={institution}
                          onChange={e => setInstitution(e.target.value)}
                          placeholder="Your institution or organization"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-forest-800 text-white font-semibold rounded-xl hover:bg-forest-900 active:bg-forest-950 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                className="text-forest-700 font-semibold hover:underline"
              >
                {mode === 'login' ? 'Register' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Prototype demo platform · Not an official government portal · Any email/password accepted
        </p>

        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-200 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
