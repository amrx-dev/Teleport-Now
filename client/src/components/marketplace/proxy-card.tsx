import { type Proxy } from "@shared/schema";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProxyCardProps {
  proxy: Proxy;
  onBook: (proxy: Proxy) => void;
}

export function ProxyCard({ proxy, onBook }: ProxyCardProps) {
  return (
    <GlassCard hoverEffect className="overflow-hidden flex flex-col h-full bg-white">
      <div className="relative h-48 overflow-hidden bg-slate-100 group">
        <img 
          src={proxy.imageUrl} 
          alt={proxy.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 text-xs font-bold text-foreground">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {proxy.rating}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-display font-bold text-lg leading-tight flex items-center gap-1">
              {proxy.name}
              <BadgeCheck className="w-4 h-4 text-blue-500" />
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {proxy.location}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {proxy.specialties.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-md px-2 py-0.5 text-xs font-normal bg-slate-100 text-slate-600 hover:bg-slate-200">
              {tag}
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-5 flex-1">
          {proxy.description}
        </p>
        
        <Button 
          onClick={() => onBook(proxy)}
          className="w-full rounded-xl font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          Teleport Now
        </Button>
      </div>
    </GlassCard>
  );
}
