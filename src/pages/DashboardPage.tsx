import { Link, Navigate } from 'react-router-dom';
import { Bookmark, Clock, Bell, FileText, Database, BarChart3, Map, Lightbulb, User, Building } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { RESEARCH_ITEMS, DATASETS } from '@/data/mockData';

const RECENT_ACTIVITY = [
  { action: 'Viewed', item: 'Digital Land Records and Tenure Security', type: 'research', time: '2 hours ago' },
  { action: 'Downloaded', item: 'District-Level Land Use Classification 2023', type: 'dataset', time: '5 hours ago' },
  { action: 'Saved', item: 'SVAMITVA Scheme: Property Card Success in Maharashtra', type: 'case-study', time: '1 day ago' },
  { action: 'Viewed', item: 'Unified Digital Land Rights Platform', type: 'policy', time: '2 days ago' },
];

const NOTIFICATIONS = [
  { text: 'New research paper added in Land Governance category', time: '1 hour ago', unread: true },
  { text: 'District data updated for Maharashtra — 2024 indicators available', time: '3 hours ago', unread: true },
  { text: 'Policy Innovation Lab: New proposal submitted for review', time: '1 day ago', unread: false },
  { text: 'MGNREGS dataset updated with 2024 figures', time: '2 days ago', unread: false },
];

const TYPE_ICON: Record<string, React.ReactNode> = {
  research: <FileText size={14} />,
  dataset: <Database size={14} />,
  'case-study': <BarChart3 size={14} />,
  policy: <Lightbulb size={14} />,
};

export default function DashboardPage() {
  const { user, savedItems, toggleSave } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const savedResearch = RESEARCH_ITEMS.filter(r => savedItems.includes(r.id));
  const savedDatasets = DATASETS.filter(d => savedItems.includes(d.id));

  const QUICK_LINKS = [
    { icon: <Map size={18} />, label: 'Land Insights', path: '/land-insights', color: 'bg-blue-50 text-blue-700' },
    { icon: <FileText size={18} />, label: 'Research Hub', path: '/research', color: 'bg-forest-50 text-forest-700' },
    { icon: <Database size={18} />, label: 'Data Explorer', path: '/data', color: 'bg-amber-50 text-amber-700' },
    { icon: <Lightbulb size={18} />, label: 'Policy Lab', path: '/policy', color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-forest-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-gray-300 text-sm">Welcome back,</p>
              <h1 className="text-2xl font-black">{user.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs bg-saffron-900/30 text-saffron-300 border border-saffron-900/40 px-2 py-0.5 rounded capitalize font-semibold">
                  {user.role}
                </span>
                {user.institution && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Building size={11} /> {user.institution}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: <Bookmark size={16} />, label: 'Saved Items', value: savedItems.length, color: 'text-forest-700' },
                { icon: <FileText size={16} />, label: 'Research Saved', value: savedResearch.length, color: 'text-blue-700' },
                { icon: <Database size={16} />, label: 'Datasets Saved', value: savedDatasets.length, color: 'text-amber-700' },
                { icon: <Clock size={16} />, label: 'Recent Views', value: RECENT_ACTIVITY.length, color: 'text-purple-700' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                  <div className={`flex justify-center mb-2 ${s.color}`}>{s.icon}</div>
                  <div className={`text-2xl font-black mb-0.5 ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Navigation */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-3">Quick Access</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {QUICK_LINKS.map(l => (
                  <Link
                    key={l.label}
                    to={l.path}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-transparent hover:border-gray-200 transition-colors ${l.color} bg-opacity-50`}
                  >
                    {l.icon}
                    <span className="text-xs font-semibold">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Saved Research */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Bookmark size={15} className="text-forest-600" /> Saved Research ({savedResearch.length})
              </h3>
              {savedResearch.length === 0 ? (
                <div className="text-center py-8">
                  <FileText size={32} className="mx-auto text-gray-200 mb-2" />
                  <p className="text-sm text-gray-400">No saved research yet. Browse the <Link to="/research" className="text-forest-700 underline">Research Hub</Link>.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedResearch.map(r => (
                    <div key={r.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <FileText size={16} className="text-forest-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{r.title}</p>
                        <p className="text-xs text-gray-400">{r.author} · {r.year}</p>
                      </div>
                      <button
                        onClick={() => toggleSave(r.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Clock size={15} className="text-forest-600" /> Recent Activity
              </h3>
              <div className="space-y-2">
                {RECENT_ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center flex-shrink-0">
                      {TYPE_ICON[a.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-700">{a.action}</span>: {a.item}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <User size={15} className="text-forest-600" /> Profile
              </h3>
              <div className="space-y-2.5">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Name</div>
                  <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Email</div>
                  <div className="text-sm text-gray-700">{user.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Role</div>
                  <div className="text-sm font-semibold text-gray-700 capitalize">{user.role}</div>
                </div>
                {user.institution && (
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Institution</div>
                    <div className="text-sm text-gray-700">{user.institution}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Bell size={15} className="text-forest-600" /> Notifications
                </h3>
                <span className="text-xs bg-forest-100 text-forest-700 font-bold px-2 py-0.5 rounded-full">
                  {NOTIFICATIONS.filter(n => n.unread).length} new
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {NOTIFICATIONS.map((n, i) => (
                  <div key={i} className={`px-5 py-3.5 ${n.unread ? 'bg-forest-50/50' : ''}`}>
                    <div className="flex items-start gap-2">
                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-forest-500 flex-shrink-0 mt-1.5"></span>}
                      <div>
                        <p className={`text-xs leading-relaxed ${n.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{n.text}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Researcher tools */}
            {user.role === 'researcher' && (
              <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-xl p-5 text-white">
                <h4 className="font-bold mb-3 text-sm">Researcher Tools</h4>
                <div className="space-y-2">
                  {['Submit Research', 'Track Submissions', 'Collaboration Board', 'Download Citations'].map(t => (
                    <button key={t} className="w-full text-left text-xs px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-forest-100">
                      {t}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-forest-300 mt-3">Full features in production version</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
