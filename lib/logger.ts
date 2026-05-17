/**
 * 结构化日志工具
 * 
 * 1. 开发环境: 输出带颜色的控制台日志，方便调试。
 * 2. 生产环境: 可以在这里对接 Sentry, LogRocket 或自定义 API。
 */

type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private isDev = process.env.NODE_ENV === "development";

  private formatMessage(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  info(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.log(`\x1b[32m${this.formatMessage("info", message)}\x1b[0m`, ...args);
    } else {
      // 生产环境逻辑
      // Sentry.captureMessage(message);
    }
  }

  warn(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.warn(`\x1b[33m${this.formatMessage("warn", message)}\x1b[0m`, ...args);
    } else {
      // Sentry.captureMessage(message, { level: "warning" });
    }
  }

  error(message: string, error?: unknown, ...args: unknown[]) {
    if (this.isDev) {
      console.error(`\x1b[31m${this.formatMessage("error", message)}\x1b[0m`, error, ...args);
    } else {
      // 生产环境关键错误上报
      // Sentry.captureException(error || new Error(message));
    }
  }

  debug(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.debug(`\x1b[36m${this.formatMessage("debug", message)}\x1b[0m`, ...args);
    }
  }
}

export const logger = new Logger();
