import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap backdrop-blur-md transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "glass-pill bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20 [a]:hover:bg-primary",
        secondary:
          "glass-pill bg-secondary/80 text-secondary-foreground shadow-sm [a]:hover:bg-secondary",
        destructive:
          "bg-destructive/15 text-destructive border border-destructive/20 shadow-sm focus-visible:ring-destructive/20 dark:bg-destructive/25 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/25",
        outline:
          "glass-pill text-foreground [a]:hover:bg-white/65 [a]:hover:text-muted-foreground",
        ghost:
          "glass-pill hover:bg-white/55 hover:text-muted-foreground dark:hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
