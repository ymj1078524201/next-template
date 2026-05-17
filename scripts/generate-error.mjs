import fs from 'fs';
import path from 'path';

const targetDir = process.argv[2];

if (!targetDir) {
  console.error('❌ 请提供目标目录路径，例如: npm run gen:error ./app/dashboard');
  process.exit(1);
}

const resolvedPath = path.resolve(process.cwd(), targetDir);
const errorFilePath = path.join(resolvedPath, 'error.tsx');

const template = `"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Local Route Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4">
      <div className="p-3 bg-destructive/10 rounded-full">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">出错了</h2>
        <p className="text-muted-foreground text-sm max-w-[400px]">
          加载该区域时发生了错误。您可以尝试重新加载或稍后再试。
        </p>
      </div>
      <Button onClick={() => reset()} variant="secondary" className="flex items-center gap-2">
        <RotateCcw className="w-4 h-4" />
        重试
      </Button>
    </div>
  );
}
`;

try {
  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
  }

  if (fs.existsSync(errorFilePath)) {
    console.warn(`⚠️ ${errorFilePath} 已存在，跳过创建。`);
  } else {
    fs.writeFileSync(errorFilePath, template);
    console.log(`✅ 成功创建: ${errorFilePath}`);
  }
} catch (err) {
  console.error('❌ 创建文件失败:', err.message);
}
