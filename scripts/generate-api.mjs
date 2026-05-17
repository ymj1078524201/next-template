import fs from 'fs';
import path from 'path';

/**
 * gen:api 脚本
 * 用法: npm run gen:api <name>
 * 示例: npm run gen:api user-profile
 * 
 * 会生成:
 * 1. app/api/<name>/route.ts (Mock API)
 * 2. lib/validations/<name>.ts (Zod Schema)
 * 3. hooks/use-<name>.ts (SWR Hook)
 */

const name = process.argv[2];

if (!name) {
  console.error('❌ 请提供 API 名称，例如: npm run gen:api user-profile');
  process.exit(1);
}

// 转换格式: user-profile -> UserProfile (PascalCase)
const pascalName = name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
// 转换格式: user-profile -> userProfile (camelCase)
const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1);

const paths = {
  schema: path.join(process.cwd(), 'lib/validations', `${name}.ts`),
  hook: path.join(process.cwd(), 'hooks', `use-${name}.ts`),
  api: path.join(process.cwd(), 'app/api', name, 'route.ts'),
};

// --- 1. Schema Template ---
const schemaTemplate = `import { z } from "zod";

/**
 * ${pascalName} 校验模式
 */
export const ${pascalName}Schema = z.object({
  id: z.string(),
  title: z.string().min(1),
  status: z.enum(["active", "inactive"]),
  updatedAt: z.string(),
});

export type ${pascalName} = z.infer<typeof ${pascalName}Schema>;
`;

// --- 2. Hook Template ---
const hookTemplate = `import { ${pascalName}Schema, type ${pascalName} } from "@/lib/validations/${name}";
import { useSafeSWR } from "@/hooks/use-safe-swr";

/**
 * 获取 ${pascalName} 数据
 */
export function use${pascalName}() {
  return useSafeSWR<${pascalName}>("/${name}", ${pascalName}Schema);
}
`;

// --- 3. Mock API Template ---
const apiTemplate = `import { NextResponse } from "next/server";

export async function GET() {
  // 模拟 API 数据
  return NextResponse.json({
    id: "mock_" + Math.random().toString(36).slice(2, 9),
    title: "模拟的 ${pascalName} 数据",
    status: "active",
    updatedAt: new Date().toISOString(),
  });
}
`;

const writeFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  if (fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} 已存在，跳过。`);
  } else {
    fs.writeFileSync(filePath, content);
    console.log(`✅  已创建: ${filePath}`);
  }
};

console.log(`🚀 正在生成 ${pascalName} 三位一体模板...`);
writeFile(paths.schema, schemaTemplate);
writeFile(paths.hook, hookTemplate);
writeFile(paths.api, apiTemplate);
console.log(`✨ 生成完毕！你可以直接在组件中使用 use${pascalName}() 了。`);
