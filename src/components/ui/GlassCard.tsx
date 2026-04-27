import { cn } from "@/lib/utils";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlassCard({ className, children }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_-16px_rgba(196,181,253,0.5)] backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_0_40px_-20px_rgba(125,211,252,0.55)] md:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}
