"use client";

import { useUIStore } from "@/store/use-ui-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout, Sidebar, Sun, Moon } from "lucide-react";

/**
 * 业务组件：Zustand 状态演示 (客户端组件)
 * 
 * 移除了复杂的挂载检查逻辑。由于不再使用持久化存储，
 * 服务器端渲染的状态与客户端初始状态完全一致，不再存在水合冲突。
 */
export function StateDemo() {
  const { sidebarOpen, toggleSidebar, theme, setTheme } = useUIStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layout className="w-5 h-5 text-blue-500" />
          Zustand 全局状态
        </CardTitle>
        <CardDescription>客户端本地状态管理</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium flex items-center gap-2">
            <Sidebar className="w-4 h-4" /> 侧边栏状态
          </span>
          <Badge variant={sidebarOpen ? "default" : "outline"}>
            {sidebarOpen ? "已展开" : "已收起"}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleSidebar} className="w-full">
            切换侧边栏
          </Button>
        </div>
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-2">主题切换演示</p>
          <div className="flex gap-2">
            <Button 
              variant={theme === 'light' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setTheme('light')}
            >
              <Sun className="w-4 h-4" />
            </Button>
            <Button 
              variant={theme === 'dark' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setTheme('dark')}
            >
              <Moon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
