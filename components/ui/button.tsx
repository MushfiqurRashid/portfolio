import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const variants: Record<Variant, { root: string; fill: string; text: string; icon: string }> = {
  primary: {
    root: "bg-ember text-ink",
    fill: "bg-cream",
    text: "text-ink",
    icon: "bg-ink text-cream",
  },
  ghost: {
    root: "border border-line-strong text-cream",
    fill: "bg-cream",
    text: "group-hover:text-ink",
    icon: "bg-cream/10 text-cream group-hover:bg-ink",
  },
};

/** Pill link with a fill sweep and rolling label on hover. */
export function PillLink({
  href,
  children,
  icon,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: string;
  icon?: React.ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  const v = variants[variant];
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full pl-6 text-sm font-medium tracking-tight transition-colors duration-500",
        icon ? "pr-1.5" : "pr-6",
        v.root,
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-700 ease-out-expo group-hover:translate-y-0",
          v.fill,
        )}
      />
      <span className={cn("relative block overflow-hidden transition-colors duration-500", v.text)}>
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {icon && (
        <span
          className={cn(
            "relative grid size-9 place-items-center rounded-full transition-colors duration-500 [&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-500 group-hover:[&>svg]:rotate-45",
            v.icon,
          )}
        >
          {icon}
        </span>
      )}
    </a>
  );
}
