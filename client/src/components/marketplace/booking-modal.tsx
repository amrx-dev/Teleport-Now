import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Proxy } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, Clock, Loader2, Star, MapPin, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  proxy: Proxy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ proxy, open, onOpenChange }: BookingModalProps) {
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [duration, setDuration] = useState("15");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a teleport session.",
        variant: "destructive",
      });
      setTimeout(() => window.location.href = "/api/login", 1000);
      return;
    }

    if (!proxy || !date || !time) return;

    // Construct timestamp
    const startTime = new Date(`${date}T${time}`);

    createBooking({
      proxyId: proxy.id,
      durationMinutes: parseInt(duration),
      startTime: startTime.toISOString() as any, // casting because schema expects Date object but JSON sends string
    }, {
      onSuccess: () => onOpenChange(false)
    });
  };

  if (!proxy) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl">
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-end">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-medium border border-white/10 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Verified Agent
          </div>
          <div className="text-white relative z-10">
            <h2 className="text-2xl font-display font-bold">{proxy.name}</h2>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {proxy.location}</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {proxy.rating}</span>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mission Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input 
                  id="date" 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Start Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input 
                  id="time" 
                  type="time" 
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration</Label>
            <div className="grid grid-cols-3 gap-3">
              {[15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDuration(mins.toString())}
                  className={`
                    py-2 rounded-xl border text-sm font-semibold transition-all
                    ${duration === mins.toString() 
                      ? "border-primary bg-primary/5 text-primary shadow-sm ring-1 ring-primary" 
                      : "border-slate-200 text-slate-600 hover:border-primary/50 hover:bg-slate-50"}
                  `}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center text-sm mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-muted-foreground font-medium">Total Cost</span>
              <span className="text-xl font-display font-bold text-foreground">
                ${(parseInt(duration) * 1.5).toFixed(2)}
              </span>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initiating Link...
                </>
              ) : (
                "Confirm Mission"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
