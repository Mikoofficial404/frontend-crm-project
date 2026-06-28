import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/20 font-sans selection:bg-primary/20">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full min-w-0">
        <Header />
        <main className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full">
            <div className="p-4 md:p-8 md:max-w-7xl mx-auto w-full animate-in fade-in duration-500">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
