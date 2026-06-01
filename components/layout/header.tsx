"use client";

import { useUIStore } from "@/store/use-ui-store";
import { Sun, Moon, Laptop, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-1.5 rounded-sm transition-transform group-hover:rotate-90">
              <Terminal className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-mono font-bold tracking-[0.2em] text-sm uppercase">
              Core<span className="text-primary">System</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest border-l pl-8">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Network: Stable
            </div>
            <div className="opacity-50">|</div>
            <div>Auth: Local_Dev</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex font-mono text-[10px] uppercase tracking-tighter h-8 px-3"
          >
            Terminal Access
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-none border border-transparent hover:border-border transition-all"
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Laptop className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
