import { z } from "zod";

/**
 * 1. 定义数据结构 (Zod Schemas)
 */

// 文章实体
export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "标题至少2个字符"),
  content: z.string().min(5, "内容至少5个字符"),
  category: z.enum(["tech", "life", "work"]),
  createdAt: z.string(),
});

// 文章列表
export const ArticleListSchema = z.array(ArticleSchema);

// 创建文章的响应
export const CreateResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ArticleSchema.optional(),
});

// 导出类型
export type Article = z.infer<typeof ArticleSchema>;
export type CreateArticleInput = {
  title: string;
  content: string;
  category: "tech" | "life" | "work";
};

/**
 * 2. 定义 API Service 函数 (Service 层)
 */

// 获取文章列表 (GET)
export async function getArticlesApi(params: { category?: string; search?: string } = {}) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 在真实场景中，你会调用真正的接口
  // const response = await apiClient.get("/articles", { params });
  // return response.data;

  // 模拟数据返回
  const allArticles: Article[] = [
    { id: "1", title: "Next.js 16 新特性", content: "PPR 和 Cache Components 是重点。", category: "tech", createdAt: new Date().toISOString() },
    { id: "2", title: "如何保持高效工作", content: "深潜模式是关键。", category: "work", createdAt: new Date().toISOString() },
    { id: "3", title: "周末的咖啡馆之旅", content: "这里的拿铁非常棒。", category: "life", createdAt: new Date().toISOString() },
  ];

  const filtered = allArticles.filter(a => {
    if (params.category && a.category !== params.category) return false;
    if (params.search && !a.title.includes(params.search)) return false;
    return true;
  });

  return filtered;
}

// 创建文章 (POST)
export async function createArticleApi(body: CreateArticleInput) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模拟 API 逻辑
  console.log("[API] 创建文章成功:", body);
  
  return {
    success: true,
    message: "文章发布成功！",
    data: {
      id: Math.random().toString(36).slice(2),
      ...body,
      createdAt: new Date().toISOString(),
    }
  };
}
