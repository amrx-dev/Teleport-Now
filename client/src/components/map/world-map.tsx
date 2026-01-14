import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { type Proxy } from "@shared/schema";
import { DivIcon } from "leaflet";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Globe, ArrowUpRight } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 10, {
          duration: 2
        });
      });
    }
  }, [map]);

  return null;
}

interface WorldMapProps {
  proxies: Proxy[];
  onSelectProxy: (proxy: Proxy) => void;
}

export function WorldMap({ proxies, onSelectProxy }: WorldMapProps) {
  const customIcon = (proxy: Proxy) => new DivIcon({
    className: "custom-marker-container",
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-10 h-10 bg-primary/20 rounded-full animate-ping"></div>
        <div class="relative w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden bg-primary ring-2 ring-primary/20 transition-transform hover:scale-110">
          <img src="${proxy.imageUrl}" class="w-full h-full object-cover" />
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
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
        <MapController />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {proxies.map((proxy) => (
          <Marker
            key={proxy.id}
            position={[proxy.latitude, proxy.longitude]}
            icon={customIcon(proxy)}
          >
            <Popup className="glass-popup custom-popup">
              <div className="w-[280px] p-0 overflow-hidden bg-white rounded-2xl shadow-2xl border-none">
                <div className="relative h-24 overflow-hidden">
                  <img src={proxy.imageUrl} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 text-white">
                    <h3 className="font-bold text-base leading-tight">{proxy.name}</h3>
                    <p className="text-[10px] font-medium opacity-80 flex items-center gap-1 uppercase tracking-widest">
                      <Globe className="w-2.5 h-2.5" /> {proxy.location}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 bg-primary/5 text-primary px-2 py-1 rounded-lg text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-primary" />
                      {proxy.rating}
                    </div>
                    <div className="flex -space-x-1">
                      {proxy.specialties.slice(0, 2).map((s, i) => (
                        <div key={i} className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                          {s}{i === 0 ? " • " : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full h-10 rounded-xl bg-primary text-white font-bold text-xs btn-glow"
                    onClick={() => onSelectProxy(proxy)}
                  >
                    Connect <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
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
