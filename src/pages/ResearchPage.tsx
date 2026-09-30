import { useState, useMemo } from 'react';
import { Search, FileText, Download, Bookmark, BookmarkCheck, Filter, X, ChevronDown } from 'lucide-react';
import { RESEARCH_ITEMS, INDIA_STATES } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

const CATEGORIES = ['All', 'Research Paper', 'Policy Brief', 'Field Study', 'Case Study', 'Impact Study'];

export default function ResearchPage() {
  const { savedItems, toggleSave } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [state, setState] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'year' | 'downloads'>('year');

  const filtered = useMemo(() => {
    return RESEARCH_ITEMS
      .filter(r => {
        const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.author.toLowerCase().includes(search.toLowerCase()) ||
          r.abstract.toLowerCase().includes(search.toLowerCase()) ||
          r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        const matchCat = category === 'All' || r.category === category;
        const matchState = state === 'All' || r.state === state;
        return matchSearch && matchCat && matchState;
      })
      .sort((a, b) => sortBy === 'downloads' ? b.downloads - a.downloads : b.year - a.year);
  }, [search, category, state, sortBy]);

  const categoryColor: Record<string, string> = {
    'Research Paper': 'bg-blue-50 text-blue-700 border-blue-200',
    'Policy Brief': 'bg-forest-50 text-forest-700 border-forest-200',
    'Field Study': 'bg-orange-50 text-orange-700 border-orange-200',
    'Case Study': 'bg-purple-50 text-purple-700 border-purple-200',
    'Impact Study': 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-4">
            Research Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Research Repository</h1>
          <p className="text-gray-300 max-w-2xl">
            Discover peer-reviewed research, policy briefs, field studies and impact assessments on land governance and rural development.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search + Filter Bar */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by title, author, topic, location..."
                className="input-field pl-10"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'year' | 'downloads')}
              className="input-field w-auto min-w-[140px]"
            >
              <option value="year">Sort: Latest</option>
              <option value="downloads">Sort: Most Downloaded</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${showFilters ? 'bg-forest-800 text-white border-forest-800' : 'border-gray-200 text-gray-600 hover:border-forest-400'}`}
            >
              <Filter size={15} />
              Filters
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`filter-chip ${category === c ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">State</label>
                <select value={state} onChange={e => setState(e.target.value)} className="input-field">
                  <option value="All">All States</option>
                  {INDIA_STATES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> of {RESEARCH_ITEMS.length} resources
            {search && <span> for "<span className="text-forest-700 font-medium">{search}</span>"</span>}
          </div>
          <span className="demo-tag">Sample / Demo Data</span>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <FileText size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">No results found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(r => (
              <div key={r.id} className="card p-6 group">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${categoryColor[r.category] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {r.category}
                      </span>
                      <span className="text-xs text-gray-400">{r.year}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-400">{r.state}</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-forest-800 transition-colors">
                      {r.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-medium text-gray-700">{r.author}</span> · {r.institution}
                    </p>

                    <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">{r.abstract}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {r.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end gap-2 flex-shrink-0">
                    <div className="text-center md:text-right mb-2">
                      <div className="text-xs text-gray-400">{r.pages} pages</div>
                      <div className="text-xs text-gray-400">{r.downloads.toLocaleString()} downloads</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSave(r.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          savedItems.includes(r.id)
                            ? 'bg-forest-50 border-forest-200 text-forest-700'
                            : 'border-gray-200 text-gray-400 hover:border-forest-300 hover:text-forest-600'
                        }`}
                        title={savedItems.includes(r.id) ? 'Saved' : 'Save'}
                      >
                        {savedItems.includes(r.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-lg text-gray-600 hover:border-forest-400 hover:text-forest-700 transition-colors">
                        <Download size={13} /> Download
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-forest-800 text-white rounded-lg hover:bg-forest-900 transition-colors">
                        <FileText size={13} /> Read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
