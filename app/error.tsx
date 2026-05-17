"use client";

import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可以在这里将错误上报给监控服务 (如 Sentry)
    console.error("Route Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border rounded-xl shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-destructive/10 rounded-full">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">页面出错了</h1>
          <p className="text-muted-foreground text-sm">
            抱歉，我们在加载此页面时遇到了问题。这可能是暂时的网络问题或系统错误。
          </p>
          {error.digest && (
            <p className="text-[10px] text-muted-foreground font-mono mt-2 uppercase">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => reset()} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            重试一次
          </Button>
          <Link 
            href="/" 
            className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2")}
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            如果问题持续存在，请联系技术支持。
          </p>
        </div>
      </div>
    </div>
  );
}
