import { Hourglass } from "lucide-react";

export function WIPBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
      <Hourglass className="h-3 w-3" />
      En desarrollo
    </span>
  );
}
