import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Activity,
  Settings,
  LogOut,
  Hexagon,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Leads", href: "/leads" },
  { icon: Briefcase, label: "Deals", href: "/deals" },
  { icon: Activity, label: "Activities", href: "/activities" },
];

export function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="hidden md:flex w-72 flex-col bg-sidebar border-r border-border h-full relative group transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-3 text-primary">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Hexagon className="h-6 w-6 fill-primary/20 stroke-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">CRM</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
          Overview
        </div>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon
                className={`h-5 w-5 transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <button
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
          onClick={() => logout()}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
