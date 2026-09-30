import { useState } from 'react';
import { AlertCircle, FileText, Database, TrendingUp, Lightbulb, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { EVIDENCE_CHAIN } from '@/data/mockData';

const STEPS = [
  {
    key: 'problem',
    label: 'Problem',
    icon: <AlertCircle size={20} />,
    color: 'bg-red-50 border-red-200 text-red-700',
    iconBg: 'bg-red-100 text-red-600',
    connectorColor: 'from-red-300 to-amber-300',
  },
  {
    key: 'research',
    label: 'Research',
    icon: <FileText size={20} />,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconBg: 'bg-blue-100 text-blue-600',
    connectorColor: 'from-amber-300 to-forest-300',
  },
  {
    key: 'data',
    label: 'Data',
    icon: <Database size={20} />,
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    iconBg: 'bg-amber-100 text-amber-600',
    connectorColor: 'from-forest-300 to-forest-500',
  },
  {
    key: 'evidence',
    label: 'Evidence',
    icon: <TrendingUp size={20} />,
    color: 'bg-forest-50 border-forest-200 text-forest-700',
    iconBg: 'bg-forest-100 text-forest-600',
    connectorColor: 'from-forest-500 to-navy-400',
  },
  {
    key: 'policy',
    label: 'Policy Solution',
    icon: <Lightbulb size={20} />,
    color: 'bg-navy-50 border-navy-200 text-navy-700',
    iconBg: 'bg-navy-100 text-navy-600',
    connectorColor: 'from-navy-400 to-saffron-400',
  },
  {
    key: 'impact',
    label: 'Expected Impact',
    icon: <BarChart2 size={20} />,
    color: 'bg-saffron-50 border-saffron-200 text-saffron-700',
    iconBg: 'bg-saffron-100 text-saffron-600',
    connectorColor: '',
  },
];

export default function EvidenceMatrix() {
  const [expanded, setExpanded] = useState<string | null>('problem');
  const { problem, research, data, policy, impact } = EVIDENCE_CHAIN;

  const getContent = (key: string) => {
    switch (key) {
      case 'problem':
        return (
          <div>
            <p className="text-gray-700 text-sm mb-3">{problem.description}</p>
            <div className="flex flex-wrap gap-2">
              {problem.stats.map(s => (
                <span key={s} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded border border-red-200 font-medium">{s}</span>
              ))}
            </div>
          </div>
        );
      case 'research':
        return (
          <div className="space-y-2">
            {research.map(r => (
              <div key={r.title} className="flex items-start gap-2 text-sm">
                <FileText size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-800">{r.title}</span>
                  <span className="text-gray-400 ml-2 text-xs">— {r.ref}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'data':
        return (
          <div className="space-y-2">
            {data.map(d => (
              <div key={d.title} className="flex items-center justify-between text-sm bg-white rounded-lg px-3 py-2 border border-amber-100">
                <span className="font-medium text-gray-800">{d.title}</span>
                <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{d.coverage}</span>
              </div>
            ))}
          </div>
        );
      case 'evidence':
        return (
          <div className="text-sm text-gray-700">
            <p className="mb-3">Research and data converge to establish clear evidence:</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-forest-500 flex-shrink-0"></span>Digitized records reduce disputes by 50-60%</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-forest-500 flex-shrink-0"></span>Formal titles increase credit access by 30-40%</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-forest-500 flex-shrink-0"></span>Women's titling improves agricultural investment 28%</li>
            </ul>
          </div>
        );
      case 'policy':
        return (
          <div className="text-sm">
            <p className="font-semibold text-gray-800 mb-1">{policy.title}</p>
            <p className="text-gray-600">{policy.description}</p>
          </div>
        );
      case 'impact':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {impact.map(i => (
              <div key={i.metric} className="text-center bg-white rounded-lg px-3 py-3 border border-saffron-100">
                <div className="text-2xl font-black text-saffron-600 mb-0.5">{i.target}</div>
                <div className="text-xs font-semibold text-gray-700 mb-0.5">{i.metric}</div>
                <div className="text-xs text-gray-400">in {i.timeline}</div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-0">
        {STEPS.map((step, i) => (
          <div key={step.key} className="relative">
            <button
              onClick={() => setExpanded(expanded === step.key ? null : step.key)}
              className={`w-full text-left border-2 rounded-xl p-4 transition-all duration-300 ${
                expanded === step.key ? `${step.color} shadow-md` : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    expanded === step.key ? step.iconBg : 'bg-gray-50 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Step {i + 1}</div>
                    <div className={`font-bold ${expanded === step.key ? '' : 'text-gray-700'}`}>{step.label}</div>
                  </div>
                </div>
                {expanded === step.key ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-300" />}
              </div>

              {expanded === step.key && (
                <div className="mt-4 pt-4 border-t border-current/10 animate-fade-in">
                  {getContent(step.key)}
                </div>
              )}
            </button>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div className="flex justify-center my-1">
                <div className={`w-0.5 h-6 bg-gradient-to-b ${step.connectorColor || 'from-gray-200 to-gray-200'} opacity-60`} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        <span className="demo-tag">Demo data — illustrative evidence chain for prototype</span>
      </div>
    </div>
  );
}
