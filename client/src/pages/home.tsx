import { Navbar } from "@/components/layout/navbar";
import { WorldMap } from "@/components/map/world-map";
import { ProxyCard } from "@/components/marketplace/proxy-card";
import { BookingModal } from "@/components/marketplace/booking-modal";
import { useProxies } from "@/hooks/use-proxies";
import { type Proxy } from "@shared/schema";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Globe, Shield, Zap, Search, Loader2, Video, X, Maximize2 } from "lucide-react";

export default function Home() {
  const { data: proxies = [], isLoading } = useProxies();
  const [selectedProxy, setSelectedProxy] = useState<Proxy | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [showLiveFeed, setShowLiveFeed] = useState(false);

  const handleBook = (proxy: Proxy) => {
    setSelectedProxy(proxy);
    setIsConnecting(true);
    
    // Simulate connection phase
    setTimeout(() => {
      setIsConnecting(false);
      setShowLiveFeed(true);
    }, 2000);
  };

  const filteredProxies = proxies.filter(p => 
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToMarketplace = () => {
    const el = document.getElementById("marketplace");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] text-slate-950 mb-6 tracking-tight">
                Be Anywhere, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Instantly.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-lg leading-relaxed font-medium">
                The world's first human-proxy marketplace. Connect to local agents worldwide via ultra-low latency HD video.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button 
                size="lg" 
                className="h-16 px-10 rounded-2xl text-xl font-bold bg-slate-950 text-white hover:bg-slate-900 animate-pulse-subtle shadow-2xl shadow-slate-950/20"
                onClick={scrollToMarketplace}
              >
                Start Teleporting
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-16 px-10 rounded-2xl text-xl font-bold border-2 border-slate-200 hover:bg-slate-50"
              >
                Watch Demo
              </Button>
            </motion.div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-500">
                <span className="text-slate-900">500+</span> sessions completed today
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* 3D Illustration Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-[3rem] rotate-6 scale-95 blur-2xl" />
              <div className="relative w-full h-full glass border-white/40 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden group">
                <Globe className="w-48 h-48 text-primary animate-spin-slow opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/20" />
                <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live from Dubai</span>
                  </div>
                  <p className="font-bold text-slate-900">"Checking the villa view for you now..."</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Teleport Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">Global Access</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Instantly connect with verified agents in 50+ major cities across the globe.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">Real-time Interaction</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Experience the world in HD with ultra-low latency live video streaming.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">Verified Proxies</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                All our agents are strictly vetted to ensure professional and reliable service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-32 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Available Proxies
              </h2>
              <p className="text-slate-600 max-w-xl text-lg">
                Choose a verified local agent to perform your mission.
              </p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                className="pl-12 h-14 rounded-2xl border-slate-200 bg-slate-50/50 text-lg focus:ring-primary/20 transition-all"
                placeholder="Search by city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-slate-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProxies.map((proxy) => (
                <ProxyCard 
                  key={proxy.id} 
                  proxy={proxy} 
                  onBook={handleBook} 
                />
              ))}
              {filteredProxies.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-400 text-xl font-medium">No proxies found in this location yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isConnecting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center text-white"
          >
            <div className="relative mb-8">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <Video className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Establishing Connection</h3>
            <p className="text-slate-400 font-medium tracking-wide">Securely linking to {selectedProxy?.location}...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Feed Simulation */}
      <AnimatePresence>
        {showLiveFeed && selectedProxy && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-8"
          >
            <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)] border border-white/10 group">
              {/* Fake Video Content */}
              <div className="absolute inset-0">
                <img 
                  src={selectedProxy.imageUrl} 
                  alt="Live Feed Background" 
                  className="w-full h-full object-cover blur-[100px] opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <p className="text-primary font-bold tracking-[0.2em] text-sm uppercase">Acquiring HD Stream</p>
                </div>
              </div>

              {/* UI Overlays */}
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <div className="bg-red-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Live
                </div>
                <div className="bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  {selectedProxy.location}
                </div>
              </div>

              <div className="absolute top-8 right-8 flex gap-3">
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white">
                  <Maximize2 className="w-5 h-5" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="w-12 h-12 rounded-full shadow-xl"
                  onClick={() => setShowLiveFeed(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/40 backdrop-blur-2xl px-10 py-6 rounded-[2.5rem] border border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Session Agent</span>
                  <span className="text-xl font-bold text-white">{selectedProxy.name}</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <Button 
                  className="h-14 px-8 rounded-2xl bg-primary text-white font-bold text-lg btn-glow"
                  onClick={() => {
                    setShowLiveFeed(false);
                    setIsBookingOpen(true);
                  }}
                >
                  Book Full Mission
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal 
        proxy={selectedProxy} 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen} 
      />

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-950">Teleport</span>
          </div>

          <div className="flex gap-10">
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Twitter</a>
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Instagram</a>
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>

          <p className="text-sm font-medium text-slate-400">
            © 2026 Teleport Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
