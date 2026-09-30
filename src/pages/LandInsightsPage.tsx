import { useState, useEffect, lazy, Suspense } from 'react';
import { MapPin, BarChart3, Users, Wheat, Trees, BookOpen, TrendingUp } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import { INDIA_STATES, STATE_DISTRICTS, getDistrictData } from '@/data/mockData';

const IndiaMap = lazy(() => import('@/components/IndiaMap'));

const INDICATOR_COLORS = ['#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a', '#81c784'];

export default function LandInsightsPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtData, setDistrictData] = useState<ReturnType<typeof getDistrictData> | null>(null);

  const districts = selectedState ? (STATE_DISTRICTS[
    INDIA_STATES.find(s => s.name === selectedState)?.id || ''
  ] || []) : [];

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      setDistrictData(getDistrictData(selectedDistrict, selectedState));
    } else {
      setDistrictData(null);
    }
  }, [selectedState, selectedDistrict]);

  const radarData = districtData ? [
    { subject: 'Literacy', value: districtData.literacyRate },
    { subject: 'Irrigation', value: districtData.irrigationCoverage },
    { subject: 'Agriculture', value: districtData.agricultureArea },
    { subject: 'Forest Cover', value: districtData.forestCover },
    { subject: 'Connectivity', value: districtData.connectivity },
    { subject: 'Rural HH', value: districtData.ruralHouseholds },
  ] : [];

  const barData = districtData ? [
    { name: 'Poverty Rate', value: districtData.povertyRate, fill: '#ef4444' },
    { name: 'Forest Cover', value: districtData.forestCover, fill: '#388e3c' },
    { name: 'Agri. Area %', value: districtData.agricultureArea, fill: '#f59e0b' },
    { name: 'Literacy %', value: districtData.literacyRate, fill: '#3b82f6' },
    { name: 'Irrigation %', value: districtData.irrigationCoverage, fill: '#8b5cf6' },
  ] : [];

  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict('');
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300 bg-saffron-900/20 px-3 py-1 rounded-full border border-saffron-900/40 mb-4">
            Land Insights
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Interactive Land Insights Map</h1>
          <p className="text-gray-300 max-w-2xl">
            Explore district-level land, agricultural, and development indicators across India. Select a state and district to view data.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Selector Bar */}
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <MapPin size={16} className="text-forest-700" />
              Select Location:
            </div>
            <select
              value={selectedState}
              onChange={e => handleStateSelect(e.target.value)}
              className="input-field w-auto min-w-[180px]"
            >
              <option value="">Select State</option>
              {INDIA_STATES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="input-field w-auto min-w-[180px]"
              disabled={!selectedState || districts.length === 0}
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {(selectedState || selectedDistrict) && (
              <button
                onClick={() => { setSelectedState(''); setSelectedDistrict(''); }}
                className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
              >
                Clear
              </button>
            )}
            <span className="ml-auto demo-tag">Sample Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden" style={{ height: '480px' }}>
              <Suspense fallback={
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-10 h-10 border-2 border-forest-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm">Loading map...</p>
                  </div>
                </div>
              }>
                <IndiaMap
                  selectedState={selectedState}
                  onStateSelect={handleStateSelect}
                />
              </Suspense>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Map shows approximate state locations — click a state marker to select · Demo data only
            </p>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {!districtData ? (
              <div className="bg-white rounded-xl border border-gray-100 p-6 text-center h-full flex flex-col items-center justify-center min-h-[200px]">
                <BarChart3 size={40} className="text-gray-200 mb-3" />
                <p className="text-gray-500 text-sm font-medium">Select a state and district to view indicators</p>
                <p className="text-gray-400 text-xs mt-1">District-level data will appear here</p>
              </div>
            ) : (
              <>
                {/* District Header */}
                <div className="bg-gradient-to-br from-forest-800 to-forest-900 text-white rounded-xl p-4">
                  <div className="text-xs text-forest-200 uppercase tracking-wider mb-1">{districtData.state}</div>
                  <div className="text-xl font-black">{districtData.name} District</div>
                  <div className="flex gap-4 mt-3 text-sm">
                    <div>
                      <div className="text-forest-200 text-xs">Population</div>
                      <div className="font-bold">{(districtData.population / 100000).toFixed(1)}L</div>
                    </div>
                    <div>
                      <div className="text-forest-200 text-xs">Rural HH%</div>
                      <div className="font-bold">{districtData.ruralHouseholds}%</div>
                    </div>
                    <div>
                      <div className="text-forest-200 text-xs">Research Papers</div>
                      <div className="font-bold">{districtData.researchPapers}</div>
                    </div>
                  </div>
                </div>

                {/* Key Indicators */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <TrendingUp size={15} className="text-forest-600" /> Key Indicators
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Agriculture Area', value: districtData.agricultureArea, unit: '%', icon: <Wheat size={13} />, color: 'bg-amber-500' },
                      { label: 'Forest Cover', value: districtData.forestCover, unit: '%', icon: <Trees size={13} />, color: 'bg-forest-600' },
                      { label: 'Literacy Rate', value: districtData.literacyRate, unit: '%', icon: <BookOpen size={13} />, color: 'bg-blue-500' },
                      { label: 'Irrigation Coverage', value: districtData.irrigationCoverage, unit: '%', icon: <TrendingUp size={13} />, color: 'bg-purple-500' },
                      { label: 'Connectivity', value: districtData.connectivity, unit: '%', icon: <Users size={13} />, color: 'bg-teal-500' },
                    ].map(ind => (
                      <div key={ind.label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                            {ind.icon} {ind.label}
                          </span>
                          <span className="font-bold text-gray-800">{ind.value}{ind.unit}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${ind.color} transition-all duration-700`}
                            style={{ width: `${ind.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Land Disputes */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-red-500 font-semibold uppercase tracking-wide mb-0.5">Land Disputes</div>
                      <div className="text-2xl font-black text-red-700">{districtData.landDisputes.toLocaleString()}</div>
                      <div className="text-xs text-red-400 mt-0.5">Registered pending cases (demo)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-0.5">Poverty Rate</div>
                      <div className="text-xl font-black text-gray-700">{districtData.povertyRate}%</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Charts Section — shown when district selected */}
        {districtData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Radar */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="text-sm font-bold text-gray-700 mb-1">District Development Profile</h4>
              <p className="text-xs text-gray-400 mb-4">Multi-dimensional indicator overview</p>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Radar name="District" dataKey="value" stroke="#2e7d32" fill="#2e7d32" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="text-sm font-bold text-gray-700 mb-1">Indicator Comparison</h4>
              <p className="text-xs text-gray-400 mb-4">Key metrics at a glance</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} unit="%" />
                  <Tooltip
                    contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}
                    formatter={(v: number) => [`${v}%`, '']}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* State overview cards */}
        {!districtData && (
          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-700 mb-4">National Overview — Sample Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Land Area', value: '328.7M ha', sub: 'Geographical area of India', color: 'text-forest-700' },
                { label: 'Agricultural Land', value: '179.8M ha', sub: '54.7% of total area', color: 'text-amber-700' },
                { label: 'Forest Cover', value: '80.9M ha', sub: '24.6% of total area', color: 'text-forest-800' },
                { label: 'Rural Population', value: '833M+', sub: '65.5% of total population', color: 'text-blue-700' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className={`text-xl font-black mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-xs font-semibold text-gray-700">{s.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">All figures are approximate sample data for demonstration</p>
          </div>
        )}
      </div>
    </div>
  );
}
