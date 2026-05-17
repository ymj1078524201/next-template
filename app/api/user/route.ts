import { NextResponse } from "next/server";

export async function GET() {
  // 模拟 API 返回数据
  // 你可以通过修改这里的结构来测试 Zod 校验失败的情况
  return NextResponse.json({
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "admin",
    createdAt: new Date().toISOString(),
  });
}
