import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Property } from '../../data/mockData';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapSectionProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  selectedPropertyId?: string | null;
}

// Custom hook helper component to change map viewport when props change
const ChangeMapView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Custom HTML price-tag marker creator
const createPriceIcon = (price: number, isSelected: boolean) => {
  const priceText = price >= 1000 
    ? `₹${(price / 1000).toFixed(0)}k` 
    : `₹${price}`;

  return L.divIcon({
    html: `
      <div class="px-2 py-0.5 rounded-full font-extrabold text-[10px] sm:text-xs shadow-md border transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
        isSelected 
          ? 'bg-primary text-white border-primary scale-110 ring-2 ring-rose-300 ring-offset-1 dark:ring-offset-zinc-900 z-50' 
          : 'bg-white text-zinc-900 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-750'
      }">
        ${priceText}
      </div>
    `,
    className: 'custom-price-pin-container',
    iconSize: [48, 22],
    iconAnchor: [24, 11]
  });
};

export const MapSection: React.FC<MapSectionProps> = ({ 
  properties, 
  center = [34.0259, -118.7798], // Default Malibu
  zoom = 6,
  selectedPropertyId = null
}) => {
  // If selectedPropertyId exists, center on it
  const activeCenter = properties.find(p => p.id === selectedPropertyId);
  const mapCenter: [number, number] = activeCenter 
    ? [activeCenter.latitude, activeCenter.longitude] 
    : center;

  const mapZoom = activeCenter ? 12 : zoom;

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ zIndex: 10 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // In dark mode we can apply a filter using tailwind custom layer wrapper, 
          // or load dark-matter tiles, but standard openstreetmap is extremely solid.
        />
        
        <ChangeMapView center={mapCenter} zoom={mapZoom} />

        {properties.map((p) => {
          const isSelected = p.id === selectedPropertyId;
          const pinIcon = createPriceIcon(p.pricePerNight, isSelected);

          return (
            <Marker 
              key={p.id} 
              position={[p.latitude, p.longitude]} 
              icon={pinIcon}
            >
              <Popup closeButton={false} minWidth={220}>
                <Link 
                  to={`/property/${p.id}`} 
                  className="flex flex-col bg-white dark:bg-zinc-900 overflow-hidden rounded-xl text-zinc-900 dark:text-white"
                >
                  <img 
                    src={p.images[0]} 
                    alt={p.title} 
                    className="w-full h-24 object-cover" 
                  />
                  <div className="p-3 text-zinc-900 dark:text-zinc-100 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-primary">{p.category}</span>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        <span>{p.rating}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-xs font-bold truncate pr-2 dark:text-white">{p.title}</h4>
                    
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      <span className="truncate">{p.city}, {p.country}</span>
                    </div>

                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-2 mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 font-medium">Per Night</span>
                      <span className="text-xs font-extrabold text-primary">₹{p.pricePerNight.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
