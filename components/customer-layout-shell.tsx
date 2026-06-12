import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { WhatsAppFab } from "@/components/shared/whatsapp-fab";

export function CustomerLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
      <MobileTabBar />
      <WhatsAppFab />
    </>
  );
}
