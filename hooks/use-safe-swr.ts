import useSWR, { SWRConfiguration, SWRResponse, Key } from "swr";
import useSWRMutation, { SWRMutationConfiguration, SWRMutationResponse } from "swr/mutation";
import { z } from "zod";
import { apiClient } from "@/lib/api-client";

/**
 * 格式化 Zod 错误，使其更易读
 */
function formatZodError(error: z.ZodError): string {
  return z.prettifyError(error);
}

/**
 * 内部工具：统一处理 Zod 校验逻辑
 */
async function validateResponse<T>(schema: z.ZodSchema<T>, dataPromise: Promise<unknown>): Promise<T> {
  try {
    const data = await dataPromise;
    const result = schema.safeParse(data);

    if (!result.success) {
      const formattedError = formatZodError(result.error);
      console.error("Zod Validation Error (Response):",formattedError);
      throw new Error(`[后端数据结构异常] \n${formattedError}`);
    }

    return result.data;
  } catch (error) {
    // 如果已经是格式化好的 Error，直接抛出
    if (error instanceof Error) throw error;
    // 否则包装一层
    throw new Error(`请求发生未知错误: ${String(error)}`);
  }
}

/**
 * 默认 Fetcher：支持自动将 Key 数组的第二项作为 Axios 的 params
 */
async function defaultFetcher(key: Key): Promise<unknown> {
  // 1. 处理纯字符串
  if (typeof key === "string") {
    const response = await apiClient.get(key);
    return response.data;
  }

  // 2. 处理数组规范：要求 [string, object]
  if (Array.isArray(key)) {
    const [url, params] = key;

    if (typeof url !== "string") {
      throw new Error(`[SWR Key Error]: 数组第一项必须是 URL 字符串。收到: ${typeof url}`);
    }
    
    // 如果有第二项，必须是对象
    if (params !== undefined && (typeof params !== "object" || params === null)) {
       throw new Error(`[SWR Key Error]: 数组第二项必须是参数对象。收到: ${typeof params}`);
    }

    const response = await apiClient.get(url, { params });
    return response.data;
  }

  throw new Error("[SWR Key Error]: 不支持的 Key 格式，请使用字符串或 [url, params] 数组。");
}

/**
 * 最佳实践版 useSafeSWR
 */
type SafeKey = string | [string, Record<string, unknown>] | null;

export function useSafeSWR<T, K extends SafeKey = string>(
  key: K,
  schema: z.ZodSchema<T>,
  fetcher?: (key: K) => Promise<unknown>,
  config?: SWRConfiguration<T, Error>
): SWRResponse<T, Error> {
  return useSWR<T, Error>(
    key,
    key ? (currentKey) => validateResponse(schema, fetcher ? fetcher(currentKey as K) : defaultFetcher(currentKey)) : null,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...config,
    }
  );
}

/**
 * 最佳实践版 useSafeSWRMutation
 */
export function useSafeSWRMutation<Data, ArgSchema extends z.ZodSchema<unknown>>(
  key: string,
  schema: z.ZodSchema<Data>,
  apiFn: (arg: z.infer<ArgSchema>) => Promise<unknown>,
  argSchema: ArgSchema,
  config?: SWRMutationConfiguration<Data, Error, string, z.infer<ArgSchema>>
): SWRMutationResponse<Data, Error, string, z.infer<ArgSchema>> {
  
  return useSWRMutation(
    key,
    async (_, { arg }) => {
      // 1. 前端入参校验 (Fail Fast)
      const inputResult = argSchema.safeParse(arg);
      if (!inputResult.success) {
        const formattedError = formatZodError(inputResult.error);
        throw new Error(`[输入参数格式错误] \n${formattedError}`);
      }

      // 2. 这里的 inputResult.data 是经过校验后的安全数据
      return validateResponse(schema, apiFn(inputResult.data));
    },
    config
  );
}
