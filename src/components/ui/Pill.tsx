import { cn } from "@/lib/utils";

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-[#EDEAF9] transition-colors hover:border-white/30 hover:bg-white/12",
        className,
      )}
    >
      {children}
    </span>
  );
}
