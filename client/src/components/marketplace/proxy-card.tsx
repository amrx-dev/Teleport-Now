import { type Proxy } from "@shared/schema";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BadgeCheck, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProxyCardProps {
  proxy: Proxy;
  onBook: (proxy: Proxy) => void;
}

export function ProxyCard({ proxy, onBook }: ProxyCardProps) {
  return (
    <GlassCard hoverEffect className="overflow-hidden flex flex-col h-full bg-white border-white/40">
      <div className="relative h-56 overflow-hidden bg-slate-100 group">
        <img 
          src={proxy.imageUrl} 
          alt={proxy.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          {proxy.rating}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold tracking-tight">{proxy.name}</h3>
              <BadgeCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center text-muted-foreground text-sm font-medium">
              <MapPin className="w-4 h-4 mr-1" />
              {proxy.location}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {proxy.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {proxy.specialties.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 border-none hover:bg-slate-200">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="pt-2 mt-auto flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 rounded-xl font-semibold border-slate-200 hover:bg-slate-50"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
          <Button 
            className="flex-1 btn-glow rounded-xl font-bold bg-primary text-white"
            onClick={() => onBook(proxy)}
          >
            Teleport Now
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
