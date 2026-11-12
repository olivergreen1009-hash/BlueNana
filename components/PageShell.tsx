import { Banana } from "./Banana";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

type PageShellProps = {
  children: React.ReactNode;
  showBanana?: boolean;
  bananaSize?: "sm" | "md" | "lg";
  bananaRemark?: boolean;
  showLogo?: boolean;
  logoSubtitle?: string;
  className?: string;
};

export function PageShell({
  children,
  showBanana = false,
  bananaSize = "sm",
  bananaRemark = false,
  showLogo = true,
  logoSubtitle,
  className = "",
}: PageShellProps) {
  return (
    <div className={`flex min-h-full flex-1 flex-col bg-white ${className}`}>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-28 pt-5">
        {showLogo ? (
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <Logo />
              {logoSubtitle ? (
                <p className="mt-0.5 text-xs text-slate-500">{logoSubtitle}</p>
              ) : null}
            </div>
            {showBanana ? (
              <Banana size={bananaSize} allowRemark={bananaRemark} />
            ) : null}
          </div>
        ) : showBanana ? (
          <div className="mb-4 flex justify-end">
            <Banana size={bananaSize} allowRemark={bananaRemark} />
          </div>
        ) : null}
        {children}
      </main>
      <Nav />
    </div>
  );
}
