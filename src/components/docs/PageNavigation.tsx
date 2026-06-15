import { Link } from "@tanstack/react-router";
import { ChevronRight, ChevronLeft } from "lucide-react";

type NavItem = {
  title: string;
  href: string;
};

type PageNavigationProps = {
  previous?: NavItem;
  next?: NavItem;
};

export function PageNavigation({ previous, next }: PageNavigationProps) {
  return (
    <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
      {previous && (
        <Link
          to={previous.href}
          className="group flex flex-col gap-1 rounded-xl border border-border p-4 text-left transition-colors hover:bg-secondary"
        >
          <span className="text-xs font-medium text-muted-foreground">
            Anterior
          </span>
          <span className="inline-flex items-center gap-2 font-medium">
            <ChevronLeft className="h-4 w-4" />
            {previous.title}
          </span>
        </Link>
      )}
      {next && (
        <Link
          to={next.href}
          className="group ml-auto flex flex-col gap-1 rounded-xl border border-border p-4 text-right transition-colors hover:bg-secondary"
        >
          <span className="text-xs font-medium text-muted-foreground">
            Siguiente
          </span>
          <span className="inline-flex items-center gap-2 font-medium">
            {next.title}
            <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      )}
    </div>
  );
}
