import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center">
                <span className="text-white font-black text-base">भू</span>
              </div>
              <div>
                <div className="text-xl font-black text-white">BhoomiSetu</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-widest">Land Governance Platform</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              From Evidence to Better Rural Governance. A national digital platform connecting research, data and policy innovation.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-saffron-900/40 text-saffron-400 rounded border border-saffron-900/50 font-medium">
                Prototype / Demo Platform
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Research Hub', path: '/research' },
                { label: 'Data & Evidence', path: '/data' },
                { label: 'Land Insights', path: '/land-insights' },
                { label: 'Policy Innovation', path: '/policy' },
                { label: 'Case Studies', path: '/case-studies' },
                { label: 'Knowledge Centre', path: '/knowledge' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Ministry</h4>
            <ul className="space-y-2.5">
              {[
                'Ministry of Rural Development',
                'Department of Land Resources',
                'National Rural Livelihoods Mission',
                'MGNREGS Portal',
                'PMAY-Gramin',
                'SVAMITVA Scheme',
              ].map(item => (
                <li key={item}>
                  <span className="text-sm text-gray-400 flex items-center gap-1.5 cursor-default">
                    <ExternalLink size={11} className="text-gray-600 flex-shrink-0" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={15} className="text-forest-500 flex-shrink-0 mt-0.5" />
                <span>Ministry of Rural Development, Krishi Bhawan, New Delhi — 110001</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={15} className="text-forest-500 flex-shrink-0" />
                <span>bhoomisetu@gov.in (Demo)</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={15} className="text-forest-500 flex-shrink-0" />
                <span>1800-xxx-xxxx (Demo)</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/about" className="text-sm text-forest-400 hover:text-forest-300 transition-colors">
                About the Platform →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2024 BhoomiSetu — A Prototype Platform. Not an official Government of India website.
            All data shown is sample/demo data for prototype demonstration purposes only.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Use</span>
            <span className="hover:text-gray-400 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
