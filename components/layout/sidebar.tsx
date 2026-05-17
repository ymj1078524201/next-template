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
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "首页",
    href: "/",
    icon: Home,
  },
  {
    title: "SWR Demo",
    href: "/examples/swr-demo",
    icon: ShieldCheck,
  },
  {
    title: "PPR 演示",
    href: "/examples/ppr",
    icon: Zap,
  },
  {
    title: "Cache 指令",
    href: "/examples/cache-directive",
    icon: Database,
  },
  {
    title: "Cache Components",
    href: "/examples/cache-demo",
    icon: Layout,
  },
];

export function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* 折叠按钮 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-4 top-10 z-20 h-8 w-8 rounded-full border bg-background shadow-sm hover:bg-accent"
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {/* 导航内容 */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-16">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                  isActive ? "bg-accent text-primary" : "text-muted-foreground",
                  !sidebarOpen && "justify-center px-0"
                )}
                title={!sidebarOpen ? item.title : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {sidebarOpen && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 底部功能 */}
      <div className="mt-auto flex flex-col gap-2 p-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-3 px-3 justify-start text-muted-foreground",
            !sidebarOpen && "justify-center px-0"
          )}
        >
          <Settings className="h-5 w-5 shrink-0" />
          {sidebarOpen && <span>设置</span>}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-3 px-3 justify-start text-muted-foreground",
            !sidebarOpen && "justify-center px-0"
          )}
        >
          <HelpCircle className="h-5 w-5 shrink-0" />
          {sidebarOpen && <span>帮助</span>}
        </Button>
      </div>
    </aside>
  );
}
