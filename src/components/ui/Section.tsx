import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-18 md:py-24 lg:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-10">{children}</div>
    </section>
  );
}
