import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Map, Database, FileText, Lightbulb, BookOpen, TrendingUp,
  ChevronRight, Users, Building2, GraduationCap, HeartHandshake, Globe2, Code2,
  Search, Shield, BarChart3, Network
} from 'lucide-react';
import EvidenceMatrix from '@/components/EvidenceMatrix';
import EvidenceAssistant from '@/components/EvidenceAssistant';

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCard({ value, label, suffix = '+', icon }: { value: number; label: string; suffix?: string; icon: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1800, active);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="w-12 h-12 rounded-xl bg-forest-900/10 flex items-center justify-center mx-auto mb-4 text-forest-700">
        {icon}
      </div>
      <div className="text-4xl font-black text-forest-900 mb-1 stat-number">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

const FEATURES = [
  { icon: <Map size={22} />, label: 'Land Insights', desc: 'Interactive map with district-level indicators and land data visualization', path: '/land-insights', color: 'bg-blue-50 text-blue-700' },
  { icon: <FileText size={22} />, label: 'Research Hub', desc: 'Research papers, field studies, policy briefs and impact assessments', path: '/research', color: 'bg-forest-50 text-forest-700' },
  { icon: <Database size={22} />, label: 'Data Explorer', desc: 'Searchable repository of rural and land-governance datasets', path: '/data', color: 'bg-amber-50 text-amber-700' },
  { icon: <Network size={22} />, label: 'Evidence Matrix', desc: 'Visual flow connecting problems, research, data and policy solutions', path: '/#evidence-matrix', color: 'bg-purple-50 text-purple-700' },
  { icon: <Lightbulb size={22} />, label: 'Policy Innovation', desc: 'Explore proposed policy interventions backed by research evidence', path: '/policy', color: 'bg-orange-50 text-orange-700' },
  { icon: <BarChart3 size={22} />, label: 'Evidence Assistant', desc: 'AI-powered assistant for discovering research and evidence', path: '/#evidence-assistant', color: 'bg-teal-50 text-teal-700' },
];

const ECOSYSTEM = [
  { icon: <Shield size={20} />, who: 'Government', how: 'Access evidence and research for informed policy decisions', sub: 'Ministries & Departments' },
  { icon: <GraduationCap size={20} />, who: 'Researchers', how: 'Discover datasets, publish findings and reach policymakers', sub: 'Universities & Institutes' },
  { icon: <Building2 size={20} />, who: 'NGOs & Development Orgs', how: 'Find evidence, case studies and connect with field partners', sub: 'Civil Society' },
  { icon: <Users size={20} />, who: 'District Administrators', how: 'Compare indicators, discover best practices and access guidance', sub: 'District & Block Level' },
  { icon: <Globe2 size={20} />, who: 'Citizens & Students', how: 'Understand rural development and land governance information', sub: 'General Public' },
  { icon: <Code2 size={20} />, who: 'Technology Partners', how: 'Build solutions using available datasets and platform APIs', sub: 'Tech Ecosystem' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'research' | 'data' | 'policy'>('research');
  const evidenceRef = useRef<HTMLDivElement>(null);
  const assistantRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-forest-950 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
          <svg viewBox="0 0 400 600" className="w-full h-full">
            <circle cx="200" cy="150" r="120" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="150" r="80" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="200" cy="150" r="40" fill="none" stroke="white" strokeWidth="1" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="white" strokeWidth="0.5" />
            <line x1="200" y1="0" x2="200" y2="300" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-500/15 text-saffron-300 text-xs font-semibold tracking-wider uppercase border border-saffron-500/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-pulse-slow"></span>
              National Digital Platform — Prototype
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Evidence for Better{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-400 to-saffron-400">
                Land Governance
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              A national digital platform connecting research, data and policy innovation to support informed rural development across India.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link to="/land-insights" className="btn-primary text-base px-6 py-3 bg-forest-600 hover:bg-forest-700">
                <Map size={18} /> Explore Land Insights
              </Link>
              <Link to="/research" className="btn-outline-white text-base px-6 py-3">
                <BookOpen size={18} /> Explore Research
              </Link>
            </div>

            {/* Quick Stats inline */}
            <div className="flex flex-wrap gap-6">
              {[['1,200+', 'Research Resources'], ['450+', 'Datasets'], ['700+', 'Districts'], ['120+', 'Policy Insights']].map(([val, lbl]) => (
                <div key={lbl} className="text-center">
                  <div className="text-2xl font-black text-saffron-400">{val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60L60,50C120,40,240,20,360,15C480,10,600,20,720,25C840,30,960,30,1080,27.5C1200,25,1320,20,1380,17.5L1440,15L1440,60L1380,60C1320,60,1200,60,1080,60C960,60,840,60,720,60C600,60,480,60,360,60C240,60,120,60,60,60Z" fill="#fafaf5" />
          </svg>
        </div>
      </section>

      {/* Flow Banner */}
      <section className="bg-cream-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            {['DISCOVER', 'UNDERSTAND', 'CONNECT', 'INNOVATE', 'IMPACT'].map((step, i) => (
              <>
                <span key={step} className={`px-4 py-2 rounded-full font-semibold ${i === 2 ? 'bg-forest-800 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                  {step}
                </span>
                {i < 4 && <ChevronRight key={`arrow-${i}`} size={16} className="text-gray-300 flex-shrink-0" />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-3">
            <span className="demo-tag">Sample Data — For Prototype Demonstration Only</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-y divide-gray-100">
            <StatCard value={1200} label="Research Resources" icon={<FileText size={22} />} />
            <StatCard value={450} label="Datasets Available" icon={<Database size={22} />} />
            <StatCard value={700} label="Districts Covered" icon={<Map size={22} />} />
            <StatCard value={120} label="Policy Insights" icon={<Lightbulb size={22} />} />
          </div>
        </div>
      </section>

      {/* Six Core Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag mb-3">Core Platform Features</span>
            <h2 className="text-3xl font-black text-navy-900 mt-3 mb-4">Six Integrated Capabilities</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              BhoomiSetu brings together six powerful tools to connect evidence with governance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Link
                key={f.label}
                to={f.path.startsWith('#') ? f.path : f.path}
                onClick={f.path === '/#evidence-matrix' ? (e) => { e.preventDefault(); evidenceRef.current?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
                className="card p-6 group cursor-pointer block"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color} transition-transform group-hover:scale-110 duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-forest-800 transition-colors">{f.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-forest-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Research Snapshot */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <span className="section-tag mb-3">Research Hub Preview</span>
              <h2 className="text-2xl font-black text-navy-900 mt-3">Recent Research & Policy Briefs</h2>
            </div>
            <div className="flex gap-2">
              {(['research', 'data', 'policy'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all capitalize ${activeTab === t ? 'bg-forest-800 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  {t === 'data' ? 'Datasets' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeTab === 'research' && [
              { title: 'Digital Land Records and Tenure Security in Rural India', author: 'Dr. Ananya Krishnan, IRDS Hyderabad', year: '2024', tag: 'Research Paper', color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { title: 'Women\'s Land Rights and Agricultural Productivity in UP', author: 'Dr. Kamla Devi, IFPRI', year: '2023', tag: 'Research Paper', color: 'bg-forest-50 text-forest-700 border-forest-200' },
              { title: 'MGNREGS and Land Asset Creation: A 10-Year Assessment', author: 'Dr. Priya Nair, Lokniti Foundation', year: '2024', tag: 'Impact Study', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            ].map(r => (
              <div key={r.title} className="card p-5 group">
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border mb-3 ${r.color}`}>{r.tag}</span>
                <h4 className="text-sm font-bold text-gray-800 mb-2 leading-snug group-hover:text-forest-800 transition-colors">{r.title}</h4>
                <p className="text-xs text-gray-400 mb-3">{r.author} · {r.year}</p>
                <Link to="/research" className="text-xs text-forest-700 font-semibold hover:underline flex items-center gap-1">
                  Read More <ArrowRight size={11} />
                </Link>
              </div>
            ))}
            {activeTab === 'data' && [
              { title: 'District-Level Land Use Classification 2023', source: 'NRSC', coverage: '700+ Districts', tag: 'GeoJSON, CSV' },
              { title: 'Rural Infrastructure Index — Village Level', source: 'MoRD', coverage: 'All States', tag: 'CSV, Excel' },
              { title: 'Tribal Land Rights — FRA Implementation Status', source: 'Min. of Tribal Affairs', coverage: '22 States', tag: 'CSV, Excel' },
            ].map(d => (
              <div key={d.title} className="card p-5">
                <span className="demo-tag mb-3 inline-block">Sample Dataset</span>
                <h4 className="text-sm font-bold text-gray-800 mb-1.5">{d.title}</h4>
                <p className="text-xs text-gray-400 mb-1">Source: {d.source}</p>
                <p className="text-xs text-gray-400 mb-3">Coverage: {d.coverage}</p>
                <span className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded font-mono">{d.tag}</span>
              </div>
            ))}
            {activeTab === 'policy' && [
              { title: 'Unified Digital Land Rights Platform', stage: 'Pilot', target: 'Land Administration', states: 'AP, MH, RJ' },
              { title: 'Community Land Trust for Tribal Areas', stage: 'Under Review', target: 'Tribal Land Rights', states: 'OD, JH, CG' },
              { title: 'Wasteland Reclamation through SHG-LED Agriculture', stage: 'Evaluated', target: 'Wasteland Development', states: 'RJ, GJ, MH' },
            ].map(p => (
              <div key={p.title} className="card p-5">
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border mb-3 ${
                  p.stage === 'Pilot' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  p.stage === 'Evaluated' ? 'bg-forest-50 text-forest-700 border-forest-200' :
                  'bg-amber-50 text-amber-700 border-amber-200'
                }`}>{p.stage}</span>
                <h4 className="text-sm font-bold text-gray-800 mb-1.5">{p.title}</h4>
                <p className="text-xs text-gray-400 mb-0.5">Target: {p.target}</p>
                <p className="text-xs text-gray-400">{p.states}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to={activeTab === 'data' ? '/data' : activeTab === 'policy' ? '/policy' : '/research'}
              className="btn-primary"
            >
              View All {activeTab === 'data' ? 'Datasets' : activeTab === 'policy' ? 'Policy Innovations' : 'Research'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Evidence Matrix */}
      <div ref={evidenceRef} id="evidence-matrix" className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag mb-3">Unique Platform Feature</span>
            <h2 className="text-3xl font-black text-navy-900 mt-3 mb-4">Evidence Matrix</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              See how problems connect to research, data, evidence and policy solutions — all in one interactive flow.
            </p>
          </div>
          <EvidenceMatrix />
        </div>
      </div>

      {/* Evidence Assistant */}
      <div ref={assistantRef} id="evidence-assistant" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag mb-3">AI Evidence Assistant</span>
            <h2 className="text-3xl font-black text-navy-900 mt-3 mb-4">Ask the Evidence Assistant</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Get instant answers about land governance, research, and rural development data.
              <span className="text-amber-600"> Demo responses — not official government data.</span>
            </p>
          </div>
          <EvidenceAssistant />
        </div>
      </div>

      {/* Platform Ecosystem */}
      <section className="py-20 bg-gradient-to-br from-navy-950 to-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-400 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-3">
              Platform Value
            </span>
            <h2 className="text-3xl font-black text-white mt-3 mb-4">Who Benefits</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              BhoomiSetu creates value across the entire rural development ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ECOSYSTEM.map((e) => (
              <div key={e.who} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-forest-900/50 border border-forest-800 flex items-center justify-center text-forest-400 mb-4">
                  {e.icon}
                </div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">{e.sub}</p>
                <h3 className="text-base font-bold text-white mb-2">{e.who}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{e.how}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-800 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">From Evidence to Better Rural Governance</h2>
          <p className="text-forest-100 mb-8">
            Start exploring research, data and evidence that drives informed policy decisions for rural India.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/land-insights" className="btn-primary bg-white text-forest-900 hover:bg-cream-100">
              <Map size={18} /> Open Land Insights
            </Link>
            <Link to="/research" className="btn-outline-white">
              <Search size={18} /> Search Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
