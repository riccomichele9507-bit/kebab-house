import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Price({
  cents,
  className,
}: {
  cents: number;
  className?: string;
}) {
  return (
    <span className={cn("font-heading font-bold tabular-nums text-ink", className)}>
      {formatPrice(cents)}
    </span>
  );
}
