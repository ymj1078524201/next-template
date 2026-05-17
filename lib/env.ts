import { z } from "zod";

/**
 * 定义环境变量的 Schema
 * 
 * 区分公共变量 (NEXT_PUBLIC_) 和私有变量
 */
const envSchema = z.object({
  // 节点环境
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  
  // 公共 API 地址
  NEXT_PUBLIC_API_URL: z.url().default("http://localhost:3000/api"),
  
  // 可以在这里添加更多私有变量，例如：
  // DATABASE_URL: z.string().url(),
  // API_SECRET: z.string().min(1),
});

/**
 * 校验环境变量
 */
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ 环境变量配置错误:");
  console.error(JSON.stringify(z.treeifyError(_env.error), null, 2));
  
  // 在生产环境，如果环境变量不对，通常应该直接让进程退出
  if (process.env.NODE_ENV === "production") {
    throw new Error("环境变量校验失败，程序已停止。");
  }
}

// 导出经过校验的环境变量（带类型推导）
export const env = _env.success ? _env.data : (process.env as unknown as z.infer<typeof envSchema>);
