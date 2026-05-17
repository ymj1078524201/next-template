"use client";

import { useUIStore } from "@/store/use-ui-store";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-black text-xl tracking-tight">
              NEXT<span className="text-primary">TEMPLATE</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5 transition-all" />
            ) : theme === "light" ? (
              <Sun className="h-5 w-5 transition-all" />
            ) : (
              <Laptop className="h-5 w-5 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
