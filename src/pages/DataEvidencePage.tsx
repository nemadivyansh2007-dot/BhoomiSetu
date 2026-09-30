import { useState, useMemo } from 'react';
import { Search, Database, Download, Eye, Filter, X, ChevronDown, FileSpreadsheet } from 'lucide-react';
import { DATASETS, INDIA_STATES } from '@/data/mockData';

const TOPICS = ['All', 'Land Use', 'Rural Infrastructure', 'Agriculture', 'Land Governance', 'Rural Employment', 'Forest Rights'];

export default function DataEvidencePage() {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('All');
  const [state, setState] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return DATASETS.filter(d => {
      const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.source.toLowerCase().includes(search.toLowerCase());
      const matchTopic = topic === 'All' || d.topic === topic;
      return matchSearch && matchTopic;
    });
  }, [search, topic, state]);

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-4">
            Data & Evidence
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Data Explorer</h1>
          <p className="text-gray-300 max-w-2xl">
            Browse and download rural and land-governance datasets. All data shown is sample data for prototype demonstration.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search datasets by name, source, topic..."
                className="input-field pl-10"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${showFilters ? 'bg-forest-800 text-white border-forest-800' : 'border-gray-200 text-gray-600 hover:border-forest-400'}`}
            >
              <Filter size={15} /> Filters <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Topic</label>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(t => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`filter-chip ${topic === t ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">State</label>
                <select value={state} onChange={e => setState(e.target.value)} className="input-field">
                  <option value="All">All States / National</option>
                  {INDIA_STATES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> datasets
          </p>
          <span className="demo-tag">Sample / Demo Datasets</span>
        </div>

        {/* Dataset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(d => (
            <div key={d.id} className="card p-5 flex flex-col group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet size={20} />
                </div>
                <span className="demo-tag">Sample Data</span>
              </div>

              <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-forest-800 transition-colors">
                {d.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{d.description}</p>

              <div className="space-y-1.5 mb-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Source</span>
                  <span className="font-medium text-gray-700 text-right max-w-[60%]">{d.source}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Year</span>
                  <span className="font-medium text-gray-700">{d.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Coverage</span>
                  <span className="font-medium text-gray-700">{d.coverage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Records</span>
                  <span className="font-medium text-gray-700">{d.records.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {d.format.split(', ').map(f => (
                  <span key={f} className="text-[11px] bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded font-mono">{f}</span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto pt-3 border-t border-gray-50">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold border border-gray-200 rounded-lg text-gray-600 hover:border-forest-400 hover:text-forest-700 transition-colors">
                  <Eye size={13} /> Preview
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-forest-800 text-white rounded-lg hover:bg-forest-900 transition-colors">
                  <Download size={13} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <Database size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500">No datasets match your criteria. Try clearing the filters.</p>
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-12 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Platform Data Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Datasets', value: '450+' },
              { label: 'Data Records', value: '50M+' },
              { label: 'State Coverage', value: '28 States' },
              { label: 'Last Updated', value: '2024' },
            ].map(s => (
              <div key={s.label} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-black text-forest-800">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">All figures are sample data for prototype demonstration</p>
        </div>
      </div>
    </div>
  );
}
