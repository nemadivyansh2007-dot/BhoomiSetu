export default function TopBar() {
  return (
    <div className="bg-navy-950 text-white text-xs border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-saffron-500 flex items-center justify-center text-[10px] font-black text-navy-950">
              भा
            </div>
            <span className="font-semibold tracking-wide text-gray-200">Government of India</span>
          </div>
          <span className="text-gray-600">|</span>
          <span className="text-gray-300">Ministry of Rural Development</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-gray-400">
          <span>Skip to content</span>
          <span className="text-gray-600">|</span>
          <span>Screen Reader</span>
          <span className="text-gray-600">|</span>
          <button className="hover:text-white transition-colors">A-</button>
          <button className="hover:text-white transition-colors font-semibold">A</button>
          <button className="hover:text-white transition-colors text-sm font-semibold">A+</button>
          <span className="text-gray-600">|</span>
          <span className="px-2 py-0.5 bg-saffron-600/20 text-saffron-400 rounded text-[10px] font-semibold tracking-wider">
            PROTOTYPE
          </span>
        </div>
      </div>
    </div>
  );
}
