import { Banana, type BananaVariant } from "./Banana";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

export type PageShellHeader =
  | "default"
  | "good"
  | "better"
  | "solutions"
  | "wins"
  | "none";

type PageShellProps = {
  children: React.ReactNode;
  header?: PageShellHeader;
  showBanana?: boolean;
  bananaSize?: "sm" | "md" | "lg" | "xl";
  bananaVariant?: BananaVariant;
  bananaRemark?: boolean;
  showLogo?: boolean;
  className?: string;
  helpSlot?: React.ReactNode;
  backSlot?: React.ReactNode;
};

export function PageShell({
  children,
  header = "default",
  showBanana = false,
  bananaSize = "sm",
  bananaVariant = "default",
  bananaRemark = false,
  showLogo = true,
  className = "",
  helpSlot,
  backSlot,
}: PageShellProps) {
  return (
    <div className={`flex min-h-full flex-1 flex-col bg-white ${className}`}>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-28 pt-4">
        {header === "none" ? null : header === "better" ? (
          <header className="relative mb-6 flex items-center justify-between border-b border-slate-100 pb-3">
            <Logo size="sm" showWordmark={false} />
            <span className="absolute left-1/2 -translate-x-1/2">
              <Logo href={null} size="sm" />
            </span>
            {helpSlot ?? (
              <span className="h-9 w-9" aria-hidden />
            )}
          </header>
        ) : header === "solutions" ? (
          <header className="mb-4 flex items-center justify-between">
            {backSlot ?? <span className="h-9 w-9" />}
            <Logo size="sm" />
            {helpSlot ?? (
              <span className="h-9 w-9" aria-hidden />
            )}
          </header>
        ) : header === "good" ? (
          <header className="mb-6 flex items-center justify-between">
            <div>
              <Logo size="sm" />
              <p className="mt-0.5 pl-1 text-xs text-slate-500">Do a Little Good</p>
            </div>
            <Banana size="md" variant="standing" allowRemark={bananaRemark} />
          </header>
        ) : header === "wins" ? (
          <header className="mb-6 flex items-center gap-3">
            <Banana size="sm" variant="standing" />
            <h1 className="flex-1 text-xl font-bold text-[#1A5AD7]">
              My Little Wins
            </h1>
            {helpSlot}
          </header>
        ) : showLogo ? (
          <DefaultHeader
            showBanana={showBanana}
            bananaSize={bananaSize}
            bananaVariant={bananaVariant}
            bananaRemark={bananaRemark}
          />
        ) : showBanana ? (
          <div className="mb-4 flex justify-center">
            <Banana
              size={bananaSize}
              variant={bananaVariant}
              allowRemark={bananaRemark}
            />
          </div>
        ) : null}
        {children}
      </main>
      <Nav />
    </div>
  );
}

function DefaultHeader({
  showBanana,
  bananaSize,
  bananaVariant,
  bananaRemark,
}: {
  showBanana: boolean;
  bananaSize: "sm" | "md" | "lg" | "xl";
  bananaVariant: BananaVariant;
  bananaRemark: boolean;
}) {
  if (showBanana) {
    return (
      <div className="mb-2 flex items-start justify-between">
        <Logo />
        <Banana
          size={bananaSize}
          variant={bananaVariant}
          allowRemark={bananaRemark}
        />
      </div>
    );
  }
  return (
    <div className="mb-6 flex justify-center pt-1">
      <Logo size="md" />
    </div>
  );
}
