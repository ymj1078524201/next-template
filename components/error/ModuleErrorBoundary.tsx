"use client";

import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ModuleErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactElement; // react-error-boundary expects ReactElement for fallback prop
  onReset?: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : "发生了一个未知错误，请尝试刷新或重试。";
  
  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-destructive/50 rounded-lg bg-destructive/5 space-y-4 text-center my-4">
      <div className="p-3 bg-destructive/10 rounded-full">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-destructive">模块运行出错了</h3>
        <p className="text-sm text-muted-foreground max-w-[300px] wrap-break-word">
          {errorMessage}
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={resetErrorBoundary}
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        重试
      </Button>
    </div>
  );
};

export function ModuleErrorBoundary({ 
  children, 
  fallback, 
  onReset 
}: ModuleErrorBoundaryProps) {
  if (fallback) {
    return (
      <ErrorBoundary
        fallback={fallback}
        onReset={onReset}
      >
        {children}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
}
