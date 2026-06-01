"use client";

import { useUIStore } from "@/store/use-ui-store";
import { 
  ShieldCheck, 
  Zap, 
  Database, 
  Layout, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  HelpCircle,
  Box,
  Cpu,
  RefreshCcw,
  Navigation,
  Type,
  MousePointer2,
  Plane
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "ROOT",
    href: "/",
    icon: Home,
  },
  {
    title: "SWR_X_ZOD",
    href: "/examples/swr-demo",
    icon: ShieldCheck,
  },
  {
    title: "SVG_SCROLL",
    href: "/examples/svg-scroll",
    icon: Box,
  },
  {
    title: "GSAP_MAGIC",
    href: "/examples/gsap-magic",
    icon: Cpu,
  },
  {
    title: "GSAP_MORPH",
    href: "/examples/gsap-morph",
    icon: RefreshCcw,
  },
  {
    title: "GSAP_MOTION",
    href: "/examples/gsap-motion",
    icon: Navigation,
  },
  {
    title: "GSAP_TEXT",
    href: "/examples/gsap-text",
    icon: Type,
  },
  {
    title: "GSAP_OBSERVER",
    href: "/examples/gsap-observer",
    icon: MousePointer2,
  },
  {
    title: "GSAP_FLIGHT",
    href: "/examples/gsap-flight",
    icon: Plane,
  },
];

export function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-card/50 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* 折叠按钮 */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 z-20 h-6 w-6 border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>

      {/* 导航内容 */}
      <div className="flex flex-1 flex-col gap-6 p-3 pt-20">
        <div className={cn("text-[9px] font-mono text-muted-foreground tracking-tighter uppercase mb-2", !sidebarOpen && "text-center")}>
          {sidebarOpen ? "Navigation_Protocols" : "NAV"}
        </div>
        
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 text-[11px] font-mono tracking-tighter transition-all relative overflow-hidden",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  !sidebarOpen && "justify-center px-0"
                )}
                title={!sidebarOpen ? item.title : undefined}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
                {sidebarOpen && <span>{item.title}</span>}
                {isActive && sidebarOpen && (
                  <div className="absolute right-0 top-0 h-full w-1 bg-white/20"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 底部功能 */}
      <div className="mt-auto flex flex-col gap-px bg-border p-3">
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-3 px-3 h-10 justify-start text-muted-foreground font-mono text-[10px] uppercase rounded-none",
            !sidebarOpen && "justify-center px-0"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {sidebarOpen && <span>Config</span>}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-3 px-3 h-10 justify-start text-muted-foreground font-mono text-[10px] uppercase rounded-none",
            !sidebarOpen && "justify-center px-0"
          )}
        >
          <HelpCircle className="h-4 w-4 shrink-0" />
          {sidebarOpen && <span>System_Manual</span>}
        </Button>
      </div>
    </aside>
  );
}
