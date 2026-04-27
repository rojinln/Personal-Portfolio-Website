type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl md:mb-10">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD] md:text-sm">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[#F8FAFC] md:text-4xl lg:text-[2.5rem]">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-[#B8B5C8]">{description}</p> : null}
    </div>
  );
}
