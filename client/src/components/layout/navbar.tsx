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
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-medium">
                  <User className="mr-2 h-4 w-4" />
                  <span>{user.firstName} {user.lastName}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    My Missions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:text-red-500">
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
