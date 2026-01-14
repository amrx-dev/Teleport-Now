import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  hoverEffect?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = "light", 
  hoverEffect = false,
  ...props 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variant === "light" ? "glass" : "glass-dark",
        hoverEffect && "hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
