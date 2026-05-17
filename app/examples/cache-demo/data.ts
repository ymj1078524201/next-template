import { z } from "zod";
import { cacheLife, cacheTag } from "next/cache";

// 1. 定义数据的 Zod Schema (保持与客户端一致)
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.email(),
  role: z.enum(["admin", "user", "guest"]),
  createdAt: z.string(),
});

export type UserData = z.infer<typeof UserSchema>;

/**
 * 使用 Next.js 16 'use cache' 的服务器端数据获取函数
 */
export async function getCachedUser(id: string): Promise<UserData> {
  "use cache";
  
  // 设置缓存生命周期：例如 5 分钟内陈旧，15 分钟背景重新验证
  cacheLife("minutes");
  
  // 为缓存打上标签，方便后续手动失效
  cacheTag("user-profile", `user-${id}`);

  console.log(`[Server] Fetching user data for ID: ${id}...`);

  // 模拟从数据库或外部 API 获取数据
  // 在真实场景中，这里可以使用 fetch() 或数据库 ORM
  const mockData = {
    id,
    name: "李四 (Cached)",
    email: "lisi@example.com",
    role: "user" as const,
    createdAt: new Date().toISOString(),
  };

  // 校验数据
  return UserSchema.parse(mockData);
}
