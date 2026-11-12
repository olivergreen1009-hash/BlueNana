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
      <main className="mx-auto flex w-full max-w-[26rem] flex-1 flex-col px-5 pb-28 pt-4">
        {showLogo ? (
          <div className="mb-6 flex items-center justify-center">
            <div className="text-center">
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
