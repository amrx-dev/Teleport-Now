import { Navbar } from "@/components/layout/navbar";
import { useAuth } from "@/hooks/use-auth";
import { useBookings } from "@/hooks/use-bookings";
import { useProxies } from "@/hooks/use-proxies";
import { GlassCard } from "@/components/ui/glass-card";
import { Loader2, Calendar, Clock, MapPin, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  const { data: proxies } = useProxies();

  if (authLoading || bookingsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    window.location.href = "/api/login";
    return null;
  }

  // Helper to get proxy details for a booking
  const getProxy = (id: number) => proxies?.find(p => p.id === id);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 px-6 pb-20 max-w-5xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
            {user.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-primary">{user.firstName?.charAt(0)}</span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-slate-500">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Your Missions</h2>

        {!bookings || bookings.length === 0 ? (
          <GlassCard className="p-12 text-center bg-white">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No missions yet</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
              You haven't booked any teleport sessions yet. Explore the map to find your first destination.
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Explore Map
            </Button>
          </GlassCard>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              const proxy = getProxy(booking.proxyId);
              const statusColor = {
                pending: "bg-yellow-100 text-yellow-700",
                confirmed: "bg-green-100 text-green-700",
                completed: "bg-slate-100 text-slate-700",
                cancelled: "bg-red-100 text-red-700",
              }[booking.status] || "bg-slate-100";

              return (
                <GlassCard key={booking.id} className="p-6 bg-white flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="w-full md:w-24 h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    {proxy && (
                      <img src={proxy.imageUrl} alt={proxy.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900">{proxy?.name || "Unknown Proxy"}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${statusColor}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {proxy?.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(booking.startTime), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(new Date(booking.startTime), "h:mm a")} • {booking.durationMinutes} min
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex gap-3">
                     <Button variant="outline" className="flex-1 md:flex-none">
                       Details
                     </Button>
                     {booking.status === 'confirmed' && (
                       <Button className="flex-1 md:flex-none">
                         Join Call
                       </Button>
                     )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
