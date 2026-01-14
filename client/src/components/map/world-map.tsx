import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { type Proxy } from "@shared/schema";
import { DivIcon } from "leaflet";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface WorldMapProps {
  proxies: Proxy[];
  onSelectProxy: (proxy: Proxy) => void;
}

export function WorldMap({ proxies, onSelectProxy }: WorldMapProps) {
  const customIcon = new DivIcon({
    className: "custom-marker-container",
    html: `<div class="custom-marker-pin"></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -35],
  });

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative z-0">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#f8fafc" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {proxies.map((proxy) => (
          <Marker
            key={proxy.id}
            position={[proxy.latitude, proxy.longitude]}
            icon={customIcon}
            eventHandlers={{
              click: () => onSelectProxy(proxy),
            }}
          >
            <Popup className="glass-popup">
              <div className="p-3 min-w-[200px]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-bold text-lg">{proxy.name}</h3>
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-700" />
                    {proxy.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-3 h-3" />
                  {proxy.location}
                </div>
                <Button 
                  size="sm" 
                  className="w-full rounded-lg text-xs"
                  onClick={() => onSelectProxy(proxy)}
                >
                  View Profile
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/80 z-[400]" />
    </div>
  );
}
