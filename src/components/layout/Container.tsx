import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
}

export function Container({
  children,
  className,
  as: Tag = "div",
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn("container-u", className)} {...props}>
      {children}
    </Tag>
  );
}
