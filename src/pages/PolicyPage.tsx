import { useState } from 'react';
import { Lightbulb, MapPin, Target, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { POLICY_INNOVATIONS } from '@/data/mockData';

const STAGES = ['All', 'Proposed', 'Under Review', 'Pilot', 'Evaluated'];

const STAGE_STYLES: Record<string, string> = {
  'Proposed': 'bg-gray-50 text-gray-600 border-gray-200',
  'Under Review': 'bg-amber-50 text-amber-700 border-amber-200',
  'Pilot': 'bg-blue-50 text-blue-700 border-blue-200',
  'Evaluated': 'bg-forest-50 text-forest-700 border-forest-200',
};

const STAGE_DOT: Record<string, string> = {
  'Proposed': 'bg-gray-400',
  'Under Review': 'bg-amber-500',
  'Pilot': 'bg-blue-500',
  'Evaluated': 'bg-forest-600',
};

export default function PolicyPage() {
  const [stage, setStage] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = POLICY_INNOVATIONS.filter(p => stage === 'All' || p.stage === stage);

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-4">
            Policy Innovation
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Policy Innovation Lab</h1>
          <p className="text-gray-300 max-w-2xl">
            Explore proposed policy interventions backed by research evidence. These are sample/demo proposals — not official government policies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Lightbulb size={16} className="text-amber-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800">Prototype / Demo Content</p>
            <p className="text-sm text-amber-700 mt-0.5">
              All policy innovations shown are sample proposals for demonstration purposes. These are NOT official government policies or announcements from the Ministry of Rural Development.
            </p>
          </div>
        </div>

        {/* Stage Filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold text-gray-500 mr-2">Filter by stage:</span>
          {STAGES.map(s => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`filter-chip ${stage === s ? 'filter-chip-active' : 'filter-chip-inactive'}`}
            >
              {s !== 'All' && <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${STAGE_DOT[s] || 'bg-gray-400'}`}></span>}
              {s}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} proposals</span>
        </div>

        {/* Pipeline View */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">
          {STAGES.slice(1).map((s, i) => {
            const count = POLICY_INNOVATIONS.filter(p => p.stage === s).length;
            return (
              <div key={s} className="flex items-center gap-2 flex-shrink-0">
                <div className={`px-4 py-2 rounded-lg border text-sm font-semibold ${STAGE_STYLES[s]} flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${STAGE_DOT[s]}`}></span>
                  {s} <span className="font-black">{count}</span>
                </div>
                {i < 3 && <span className="text-gray-300 text-lg">→</span>}
              </div>
            );
          })}
        </div>

        {/* Policy Cards */}
        <div className="space-y-4">
          {filtered.map(p => (
            <div key={p.id} className="card overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Lightbulb size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${STAGE_STYLES[p.stage]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STAGE_DOT[p.stage]}`}></span>
                        {p.stage}
                      </span>
                      <span className="text-xs text-gray-400">{p.year}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{p.targetArea}</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-1">{p.title}</h3>
                    <p className="text-xs text-gray-400 mb-3">{p.submittedBy}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                        <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Problem</div>
                        <p className="text-xs text-gray-600 leading-relaxed">{p.problem}</p>
                      </div>
                      <div className="bg-forest-50 rounded-lg p-3 border border-forest-100">
                        <div className="text-xs font-semibold text-forest-600 uppercase tracking-wide mb-1">Proposed Solution</div>
                        <p className="text-xs text-gray-600 leading-relaxed">{p.solution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={12} className="text-forest-600" />
                        {p.states.join(', ')}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-forest-700 transition-colors flex-shrink-0 mt-1"
                  >
                    {expanded === p.id ? <><ChevronUp size={15} /> Less</> : <><ChevronDown size={15} /> More</>}
                  </button>
                </div>
              </div>

              {expanded === p.id && (
                <div className="px-6 pb-6 animate-fade-in border-t border-gray-50 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={14} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Expected Impact</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{p.expectedImpact}</p>
                    </div>
                    <div className="bg-saffron-50 rounded-xl p-4 border border-saffron-100">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-saffron-600" />
                        <span className="text-xs font-bold text-saffron-700 uppercase tracking-wide">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map(t => (
                          <span key={t} className="text-xs bg-white border border-saffron-200 text-saffron-700 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
