import { useState } from 'react';
import { Search, BookOpen, Download, FileText, BarChart2, Info, HelpCircle } from 'lucide-react';
import { KNOWLEDGE_RESOURCES } from '@/data/mockData';
import EvidenceAssistant from '@/components/EvidenceAssistant';

const TYPES = ['All', 'Report', 'Guidelines', 'Policy Brief', 'Research'];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  'Report': <BarChart2 size={18} />,
  'Guidelines': <FileText size={18} />,
  'Policy Brief': <Info size={18} />,
  'Research': <BookOpen size={18} />,
};

const TYPE_COLORS: Record<string, string> = {
  'Report': 'bg-blue-50 text-blue-700 border-blue-200',
  'Guidelines': 'bg-forest-50 text-forest-700 border-forest-200',
  'Policy Brief': 'bg-purple-50 text-purple-700 border-purple-200',
  'Research': 'bg-amber-50 text-amber-700 border-amber-200',
};

const FAQS = [
  { q: 'What is BhoomiSetu?', a: 'BhoomiSetu is a national digital platform prototype that connects research, data and policy innovation to support evidence-based rural land governance in India.' },
  { q: 'Is the data on this platform official government data?', a: 'No. BhoomiSetu is a prototype/demo platform. All data, statistics and figures shown are sample data for demonstration purposes only.' },
  { q: 'Who can use this platform?', a: 'The platform is designed for policymakers, researchers, NGOs, district administrators and citizens interested in rural development and land governance.' },
  { q: 'How can I submit my research?', a: 'In the full platform, researchers can register and submit research through their dashboard. This feature is available in the prototype with demo functionality.' },
  { q: 'What is the Evidence Matrix?', a: 'The Evidence Matrix is a unique feature that visually connects problems, research, data and evidence to policy solutions — helping users understand the evidence chain behind policy decisions.' },
  { q: 'What is the Evidence Assistant?', a: 'The Evidence Assistant is a demo AI interface that helps users discover relevant research, datasets and evidence. Responses are pre-programmed for the prototype.' },
];

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const filtered = KNOWLEDGE_RESOURCES.filter(k => {
    const matchSearch = !search || k.title.toLowerCase().includes(search.toLowerCase()) ||
      k.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchType = type === 'All' || k.type === type;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-4">
            Knowledge Centre
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Knowledge Centre</h1>
          <p className="text-gray-300 max-w-2xl">
            Reports, guidelines, policy briefs and resources on land governance and rural development.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resources */}
          <div className="lg:col-span-2">
            {/* Search + Filter */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
              <div className="flex gap-3 flex-wrap mb-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search knowledge resources..."
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`filter-chip ${type === t ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map(k => (
                <div key={k.id} className="card p-5 flex items-start gap-4 group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[k.type] || 'bg-gray-50 text-gray-500 border-gray-200'} border`}>
                    {TYPE_ICONS[k.type] || <FileText size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${TYPE_COLORS[k.type] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {k.type}
                      </span>
                      <span className="text-xs text-gray-400">{k.year} · {k.pages} pages</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-forest-800 transition-colors mb-1">{k.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{k.author}</p>
                    <div className="flex flex-wrap gap-1">
                      {k.tags.map(t => (
                        <span key={t} className="text-xs bg-gray-50 text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-forest-700 hover:border-forest-300 transition-colors">
                      <BookOpen size={14} />
                    </button>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-forest-700 hover:border-forest-300 transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <BookOpen size={40} className="mx-auto text-gray-200 mb-3" />
                <p className="text-gray-500">No resources found. Try a different search.</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* FAQ */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <HelpCircle size={16} className="text-forest-600" /> Frequently Asked Questions
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {FAQS.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full text-left px-5 py-3.5 flex items-start justify-between gap-2 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                      <span className="text-gray-400 flex-shrink-0 mt-0.5">
                        {faqOpen === i ? '−' : '+'}
                      </span>
                    </button>
                    {faqOpen === i && (
                      <div className="px-5 pb-3.5 animate-fade-in">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-forest-900 text-white rounded-xl p-5">
              <h4 className="font-bold mb-4 text-sm">Knowledge Base Stats</h4>
              {[
                { label: 'Total Resources', value: '850+' },
                { label: 'Reports & Guides', value: '320+' },
                { label: 'Policy Briefs', value: '180+' },
                { label: 'Research Papers', value: '350+' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-forest-800">
                  <span className="text-sm text-forest-200">{s.label}</span>
                  <span className="font-bold text-saffron-400">{s.value}</span>
                </div>
              ))}
              <p className="text-xs text-forest-400 mt-3">Sample figures — prototype demonstration</p>
            </div>
          </div>
        </div>

        {/* Evidence Assistant */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-navy-900 mb-2">Can't find what you need?</h2>
            <p className="text-gray-500">Ask the Evidence Assistant to find relevant research and resources.</p>
          </div>
          <EvidenceAssistant />
        </div>
      </div>
    </div>
  );
}
