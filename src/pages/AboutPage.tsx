import { Link } from 'react-router-dom';
import { Map, Database, FileText, Lightbulb, Network, BarChart3, Target, Shield, Users, Code2 } from 'lucide-react';

const TEAM_FEATURES = [
  { icon: <Map size={20} />, title: 'Land Insights Map', desc: 'Interactive district-level land and development indicators across India' },
  { icon: <FileText size={20} />, title: 'Research Hub', desc: 'Searchable repository of research papers, policy briefs and impact studies' },
  { icon: <Database size={20} />, title: 'Data Explorer', desc: 'Curated dataset collection for land governance and rural development' },
  { icon: <Network size={20} />, title: 'Evidence Matrix', desc: 'Visual flow connecting problems, research, data and policy solutions' },
  { icon: <Lightbulb size={20} />, title: 'Policy Innovation Lab', desc: 'Platform for proposing and evaluating evidence-backed policy innovations' },
  { icon: <BarChart3 size={20} />, title: 'Evidence Assistant', desc: 'AI-powered interface for discovering research and evidence' },
];

const PRINCIPLES = [
  { icon: <Target size={20} />, title: 'Evidence-First', desc: 'Every policy suggestion must be backed by research and data' },
  { icon: <Shield size={20} />, title: 'Public Interest', desc: 'Platform serves public and institutional benefit, not commercial interests' },
  { icon: <Users size={20} />, title: 'Inclusive Access', desc: 'Designed for researchers, administrators, NGOs and citizens alike' },
  { icon: <Code2 size={20} />, title: 'Open Standards', desc: 'Built on open technologies with accessible data formats and APIs' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-4">
            About
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">About BhoomiSetu</h1>
          <p className="text-gray-300 max-w-2xl">
            A prototype national digital platform for research, policy innovation and evidence-based land governance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
          <p className="text-sm font-bold text-amber-800 mb-1">Prototype Disclaimer</p>
          <p className="text-sm text-amber-700">
            BhoomiSetu is a hackathon prototype created to demonstrate the concept of a national digital platform for land governance and rural development. It is NOT an official Government of India website or platform. All data, statistics, research, datasets, and policy proposals shown are sample/demo content for demonstration purposes only.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <span className="section-tag mb-4">Mission</span>
            <h2 className="text-2xl font-black text-navy-900 mt-4 mb-4">Connecting Evidence to Governance</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              India's rural development and land governance systems face a fundamental challenge: research, datasets, and policy knowledge exist in silos across dozens of ministries, institutions, and departments.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              BhoomiSetu — meaning "Bridge to Land" — is designed to solve this by creating one centralized platform where researchers, policymakers, administrators, and citizens can discover, connect, and act on evidence.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The platform's main USP: instead of keeping research, datasets and policy information separately, BhoomiSetu connects them into one evidence-to-action ecosystem.
            </p>
          </div>
          <div className="bg-gradient-to-br from-navy-900 to-forest-900 rounded-2xl p-8 text-white">
            <div className="text-4xl font-black text-saffron-400 mb-2">DISCOVER</div>
            <div className="text-gray-400 text-sm mb-4">Research, datasets, and evidence</div>
            <div className="w-px h-8 bg-forest-700 ml-4 mb-1"></div>
            <div className="text-4xl font-black text-saffron-400 mb-2">UNDERSTAND</div>
            <div className="text-gray-400 text-sm mb-4">Context, impact, and connection</div>
            <div className="w-px h-8 bg-forest-700 ml-4 mb-1"></div>
            <div className="text-4xl font-black text-saffron-400 mb-2">CONNECT</div>
            <div className="text-gray-400 text-sm mb-4">Research to policy to outcome</div>
            <div className="w-px h-8 bg-forest-700 ml-4 mb-1"></div>
            <div className="text-4xl font-black text-saffron-400 mb-2">INNOVATE</div>
            <div className="text-gray-400 text-sm mb-4">Evidence-backed policy proposals</div>
            <div className="w-px h-8 bg-forest-700 ml-4 mb-1"></div>
            <div className="text-4xl font-black text-saffron-400 mb-2">IMPACT</div>
            <div className="text-gray-400 text-sm">Measurable governance outcomes</div>
          </div>
        </div>

        {/* Six Features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-tag mb-3">Platform Features</span>
            <h2 className="text-2xl font-black text-navy-900 mt-3">Six Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_FEATURES.map(f => (
              <div key={f.title} className="card p-5 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-forest-50 text-forest-700 flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{f.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="section-tag mb-3">Design Principles</span>
            <h2 className="text-2xl font-black text-navy-900 mt-3">Built on Four Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center mx-auto mb-3">
                  {p.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{p.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-10">
          <h3 className="font-bold text-gray-800 mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { layer: 'Frontend', tech: 'React + Vite + TypeScript' },
              { layer: 'Styling', tech: 'Tailwind CSS' },
              { layer: 'Charts', tech: 'Recharts' },
              { layer: 'Maps', tech: 'React-Leaflet + OSM' },
              { layer: 'Backend', tech: 'Node.js + Express' },
              { layer: 'Database', tech: 'Supabase (PostgreSQL)' },
              { layer: 'Auth', tech: 'JWT + HTTP-only Cookies' },
              { layer: 'Icons', tech: 'Lucide React' },
            ].map(t => (
              <div key={t.layer} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="text-xs text-gray-400 font-medium mb-0.5">{t.layer}</div>
                <div className="text-sm font-bold text-gray-700">{t.tech}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-forest-900 to-navy-900 rounded-2xl py-12 px-6 text-white">
          <h2 className="text-2xl font-black mb-3">From Evidence to Better Rural Governance</h2>
          <p className="text-forest-200 mb-8 max-w-xl mx-auto">
            Explore the platform and see how connecting research, data and policy can transform rural land governance.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/land-insights" className="btn-primary bg-white text-forest-900 hover:bg-cream-100">
              Explore Land Insights
            </Link>
            <Link to="/research" className="btn-outline-white">
              Browse Research
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
