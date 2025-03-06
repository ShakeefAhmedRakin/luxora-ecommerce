export default function SeparatorWithText({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 bg-border h-[1px]"></div>
      <span className="text-sm text-muted-foreground">{children}</span>
      <div className="flex-1 bg-border h-[1px]"></div>
    </div>
  );
}
