import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { MapPin, Zap, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass border-b-0 rounded-none bg-white/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center bg-primary rounded-lg shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
            <MapPin className="w-5 h-5 text-white absolute" />
            <Zap className="w-3 h-3 text-white absolute -top-1 -right-1 fill-yellow-300 stroke-yellow-300" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Teleport
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#marketplace" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Explore
          </a>
          <a 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Become a Proxy
          </a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.firstName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2 rounded-2xl" align="end" forceMount>
                  <div className="px-3 py-3 border-b border-slate-100 mb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Wallet Balance</p>
                    <p className="text-2xl font-black text-primary">$50.00</p>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recent Teleports</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Tokyo Session</p>
                          <p className="text-[10px] text-slate-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">London Tour</p>
                          <p className="text-[10px] text-slate-500">Last week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100 my-2" />
                  <DropdownMenuItem className="font-medium rounded-xl h-11">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.firstName} {user.lastName}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:text-red-500 rounded-xl h-11">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href="/api/login">
              <Button className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl">
                Login
              </Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
