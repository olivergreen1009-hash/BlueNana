import { Banana } from "./Banana";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

type PageShellProps = {
  children: React.ReactNode;
  showBanana?: boolean;
  bananaSize?: "sm" | "md" | "lg";
  bananaRemark?: boolean;
  showLogo?: boolean;
  className?: string;
};

export function PageShell({
  children,
  showBanana = false,
  bananaSize = "sm",
  bananaRemark = false,
  showLogo = true,
  className = "",
}: PageShellProps) {
  return (
    <div className={`flex min-h-full flex-1 flex-col bg-white ${className}`}>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-28 pt-5">
        {showLogo ? (
          <div className="mb-4 flex items-start justify-between">
            <Logo />
            {showBanana ? (
              <Banana size={bananaSize} allowRemark={bananaRemark} />
            ) : null}
          </div>
        ) : showBanana ? (
          <div className="mb-4 flex justify-center">
            <Banana size={bananaSize} allowRemark={bananaRemark} />
          </div>
        ) : null}
        {children}
      </main>
      <Nav />
    </div>
  );
}
