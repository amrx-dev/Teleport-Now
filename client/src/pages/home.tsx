import { Navbar } from "@/components/layout/navbar";
import { WorldMap } from "@/components/map/world-map";
import { ProxyCard } from "@/components/marketplace/proxy-card";
import { BookingModal } from "@/components/marketplace/booking-modal";
import { useProxies } from "@/hooks/use-proxies";
import { type Proxy } from "@shared/schema";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

export default function Home() {
  const { data: proxies = [], isLoading } = useProxies();
  const [selectedProxy, setSelectedProxy] = useState<Proxy | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBook = (proxy: Proxy) => {
    setSelectedProxy(proxy);
    setIsBookingOpen(true);
  };

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
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-slate-900 mb-6">
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
                className="h-14 px-8 rounded-2xl text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all"
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

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60">
              <div className="flex flex-col gap-2">
                <Globe className="w-6 h-6 text-primary" />
                <span className="font-bold text-slate-900">Global Reach</span>
                <span className="text-xs text-slate-500">Access 50+ Cities</span>
              </div>
              <div className="flex flex-col gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-bold text-slate-900">Live Feed</span>
                <span className="text-xs text-slate-500">HD Low Latency</span>
              </div>
              <div className="flex flex-col gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold text-slate-900">Verified</span>
                <span className="text-xs text-slate-500">Vetted Proxies</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Map Preview */}
            <WorldMap proxies={proxies} onSelectProxy={handleBook} />
          </motion.div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                Available Proxies
              </h2>
              <p className="text-slate-600 max-w-xl">
                Choose a verified local agent to perform your mission. From shopping to site inspections, they are ready to connect.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 text-primary">
              View All Locations <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proxies.map((proxy, i) => (
                <ProxyCard 
                  key={proxy.id} 
                  proxy={proxy} 
                  onBook={handleBook} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <BookingModal 
        proxy={selectedProxy} 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen} 
      />
    </div>
  );
}
