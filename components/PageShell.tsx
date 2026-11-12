import { Banana } from "./Banana";
import { Nav } from "./Nav";

type PageShellProps = {
  children: React.ReactNode;
  showBanana?: boolean;
  bananaRemark?: boolean;
};

export function PageShell({
  children,
  showBanana = true,
  bananaRemark = false,
}: PageShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-sky-50/80">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-28 pt-6">
        {showBanana ? (
          <div className="mb-4 flex justify-center">
            <Banana allowRemark={bananaRemark} />
          </div>
        ) : null}
        {children}
      </main>
      <Nav />
    </div>
  );
}
