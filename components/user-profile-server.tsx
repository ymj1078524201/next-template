import { getCachedUser } from "@/app/examples/cache-demo/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, ShieldCheck } from "lucide-react";

/**
 * 服务器组件：使用 Cache Components 获取并展示用户信息
 */
export async function UserProfileServer({ id }: { id: string }) {
  // 直接在服务器端获取缓存数据
  const user = await getCachedUser(id);

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            用户信息 (Server Cached)
          </CardTitle>
          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
            {user.role}
          </Badge>
        </div>
        <CardDescription>
          此组件使用 Next.js 16 <code>&apos;use cache&apos;</code> 指令在服务器端渲染。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">姓名</p>
            <p className="font-medium">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">邮箱</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">数据来源</p>
            <p className="font-medium text-green-600 dark:text-green-400">
              Prerendered at {new Date(user.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
