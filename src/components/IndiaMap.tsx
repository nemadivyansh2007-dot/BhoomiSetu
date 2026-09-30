import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import { INDIA_STATES } from '@/data/mockData';

interface Props {
  selectedState: string;
  onStateSelect: (state: string) => void;
}

export default function IndiaMap({ selectedState, onStateSelect }: Props) {
  return (
    <MapContainer
      center={[22, 80]}
      zoom={4}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.85}
      />
      {INDIA_STATES.map(state => (
        <CircleMarker
          key={state.id}
          center={[state.lat, state.lng]}
          radius={selectedState === state.name ? 14 : 10}
          pathOptions={{
            fillColor: selectedState === state.name ? '#1b5e20' : '#2e7d32',
            fillOpacity: selectedState === state.name ? 0.95 : 0.75,
            color: selectedState === state.name ? '#0a3d12' : '#1b5e20',
            weight: selectedState === state.name ? 3 : 1.5,
          }}
          eventHandlers={{ click: () => onStateSelect(state.name) }}
        >
          <Popup>
            <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 140 }}>
              <div style={{ fontWeight: 700, color: '#1b5e20', marginBottom: 4 }}>{state.name}</div>
              <button
                onClick={() => onStateSelect(state.name)}
                style={{
                  background: '#2e7d32', color: 'white', border: 'none',
                  padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', width: '100%'
                }}
              >
                View District Data
              </button>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
