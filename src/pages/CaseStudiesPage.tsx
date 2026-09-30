import { useState } from 'react';
import { MapPin, BookOpen, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { CASE_STUDIES } from '@/data/mockData';

const CATEGORIES = ['All', 'Land Rights', 'Forest Rights', 'Gender & Land', 'Digital Governance'];

const IMPACT_STYLES: Record<string, string> = {
  'High': 'bg-forest-50 text-forest-700 border-forest-200',
  'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'Low': 'bg-gray-50 text-gray-600 border-gray-200',
};

export default function CaseStudiesPage() {
  const [category, setCategory] = useState('All');
  const [expanded, setExpanded] = useState<string | null>('cs1');

  const filtered = CASE_STUDIES.filter(c => category === 'All' || c.category === category);

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-4">
            Case Studies
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Evidence from the Field</h1>
          <p className="text-gray-300 max-w-2xl">
            Real-world implementation stories documenting problems, interventions and outcomes in land governance and rural development.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold text-gray-500 mr-2">Category:</span>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`filter-chip ${category === c ? 'filter-chip-active' : 'filter-chip-inactive'}`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto demo-tag">Sample Case Studies</span>
        </div>

        <div className="space-y-6">
          {filtered.map(cs => (
            <div key={cs.id} className="card overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${IMPACT_STYLES[cs.impact] || IMPACT_STYLES.Medium}`}>
                    {cs.impact} Impact
                  </span>
                  <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded font-semibold">
                    {cs.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={11} /> {cs.location}
                  </span>
                  <span className="text-xs text-gray-400">{cs.year}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{cs.title}</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                    <div className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Problem</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{cs.problem}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Intervention</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{cs.intervention}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">Evidence</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{cs.evidence}</p>
                  </div>
                </div>

                <button
                  onClick={() => setExpanded(expanded === cs.id ? null : cs.id)}
                  className="flex items-center gap-2 text-xs font-semibold text-forest-700 hover:text-forest-900 transition-colors"
                >
                  <BookOpen size={14} />
                  {expanded === cs.id ? 'Show Less' : 'Read Full Case Study'}
                  {expanded === cs.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {expanded === cs.id && (
                <div className="px-6 pb-6 border-t border-gray-50 pt-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-forest-50 rounded-xl p-4 border border-forest-100">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-forest-600" />
                        <span className="text-xs font-bold text-forest-700 uppercase tracking-wide">Outcome</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{cs.outcome}</p>
                    </div>
                    <div className="bg-navy-50 rounded-xl p-4 border border-navy-100">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={14} className="text-navy-600" />
                        <span className="text-xs font-bold text-navy-700 uppercase tracking-wide">Lessons Learned</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{cs.lessons}</p>
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
