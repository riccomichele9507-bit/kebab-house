import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-3 px-4", className)}>
      <div>
        {eyebrow && (
          <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
            {eyebrow}
          </p>
        )}
        <h2 className="font-heading text-xl font-bold leading-tight text-ink">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
