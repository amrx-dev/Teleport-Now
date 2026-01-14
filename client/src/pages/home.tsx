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
import { ArrowRight, Globe, Shield, Zap, Search, Loader2, Video, X, Maximize2, MapPin, Headphones, CreditCard, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { data: proxies = [], isLoading } = useProxies();
  const [selectedProxy, setSelectedProxy] = useState<Proxy | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [showLiveFeed, setShowLiveFeed] = useState(false);

  const pricingTiers = [
    {
      name: "Starter",
      price: "$5",
      period: "per trip",
      description: "For one-time quick look-around.",
      features: ["1 Live Teleport Session", "Standard HD Quality", "Direct Messaging", "24h Support"],
      button: "Get Started",
      highlight: false
    },
    {
      name: "Explorer",
      price: "$19",
      period: "per month",
      description: "For travelers and shoppers.",
      features: ["5 Live Teleport Sessions", "Ultra HD Quality", "Priority Booking", "Direct Messaging", "24/7 Premium Support"],
      button: "Start Free Trial",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For real estate and business inspections.",
      features: ["Unlimited Teleports", "Custom Reporting", "Multi-Agent Support", "White-labeled Feed", "Dedicated Account Manager"],
      button: "Contact Sales",
      highlight: false
    }
  ];

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
    <div className="min-h-screen bg-slate-50/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-7xl md:text-9xl font-bold leading-[0.95] text-slate-950 mb-8 tracking-tighter">
                Be Anywhere, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-400">
                  Instantly.
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-600 max-w-lg leading-relaxed font-semibold">
                The world's first human-proxy marketplace. Connect to local agents worldwide via live video.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="h-20 px-12 rounded-[2rem] text-2xl font-black bg-slate-950 text-white hover:bg-slate-900 animate-pulse-subtle shadow-2xl shadow-slate-950/20"
                  onClick={scrollToMarketplace}
                >
                  Start Teleporting
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-20 px-12 rounded-[2rem] text-2xl font-black border-2 border-slate-200 hover:bg-slate-50 glass"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-3 ml-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Trusted by <span className="text-slate-950">10,000+</span> users worldwide
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:ml-auto animate-float"
          >
            <div className="relative w-full max-w-[550px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-400/30 rounded-[4rem] rotate-12 scale-95 blur-3xl opacity-50" />
              <div className="relative w-full h-full glass border-white/40 rounded-[4rem] shadow-2xl flex items-center justify-center overflow-hidden group shadow-primary/20">
                <Globe className="w-64 h-64 text-primary animate-spin-slow opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/30" />
                <div className="absolute bottom-10 left-10 right-10 p-8 glass rounded-3xl border-white/30 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-sm font-black uppercase tracking-widest text-primary">Live from London</span>
                  </div>
                  <p className="text-xl font-black text-slate-950">"Checking the historical archives for your research..."</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Teleport Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-tighter">
              Why Choose Teleport?
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Our platform offers the most seamless virtual presence experience in the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Global Reach", icon: Globe, desc: "Connect in 50+ major cities worldwide instantly." },
              { title: "Secure Payments", icon: CreditCard, desc: "Transaction-level security for every session." },
              { title: "Verified Proxies", icon: Shield, desc: "Strictly vetted professionals at your service." },
              { title: "24/7 Support", icon: Headphones, desc: "Always here when you need a teleport." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:border-primary/20 transition-all group hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white text-primary">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm uppercase tracking-wider">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-tighter">
              Simple & Transparent Pricing
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Choose the plan that fits your teleportation needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-10 rounded-[3rem] bg-white border-2 transition-all hover:shadow-2xl hover:shadow-primary/10 ${
                  tier.highlight ? 'border-primary shadow-xl shadow-primary/10 scale-105 z-10' : 'border-slate-100 shadow-sm shadow-blue-500/5'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{tier.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-950">{tier.price}</span>
                    <span className="text-slate-400 font-bold">{tier.period}</span>
                  </div>
                  <p className="text-slate-500 mt-4 font-medium">{tier.description}</p>
                </div>

                <div className="space-y-4 mb-10">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-slate-600 font-bold text-sm tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full h-16 rounded-2xl text-lg font-black transition-all ${
                    tier.highlight 
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20' 
                      : 'bg-slate-100 text-slate-950 hover:bg-slate-200'
                  }`}
                >
                  {tier.button}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Teleport Section - Marketplaces */}
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
