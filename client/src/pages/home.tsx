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
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight">
                Be Anywhere, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                  Instantly.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
                Rent local proxies to be your eyes and ears in remote locations via live video. Experience the world without leaving your home.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button 
                size="lg" 
                className="h-14 px-8 rounded-2xl text-lg btn-glow bg-primary text-white"
                onClick={scrollToMarketplace}
              >
                Start Teleporting
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8 rounded-2xl text-lg border-2 hover:bg-slate-100"
              >
                How it Works
              </Button>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200/60">
              <div className="flex flex-col gap-2">
                <Globe className="w-6 h-6 text-primary" />
                <span className="font-bold text-slate-900">Global Reach</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Access 50+ Cities</span>
              </div>
              <div className="flex flex-col gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-bold text-slate-900">Live Feed</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">HD Low Latency</span>
              </div>
              <div className="flex flex-col gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold text-slate-900">Verified</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Vetted Proxies</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <WorldMap proxies={proxies} onSelectProxy={handleBook} />
          </motion.div>
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
    </div>
  );
}
