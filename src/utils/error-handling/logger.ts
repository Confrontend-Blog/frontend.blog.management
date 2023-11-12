import * as Sentry from "@sentry/react";

type LogLevel = "info" | "warn" | "error" | "debug";

function isString(data: unknown): data is string {
  return typeof data === "string";
}

function formatMessage(level: LogLevel, message: string): string {
  return `${level.toUpperCase()}: ${message}`;
}

function log<T>(level: LogLevel, data: T): void {
  const message = isString(data) ? data : JSON.stringify(data);
  const formattedMessage = formatMessage(level, message);

  switch (level) {
    case "info":
      console.info(formattedMessage);
      break;
    case "warn":
      console.warn(formattedMessage);
      break;
    case "error":
      console.error(formattedMessage);
      Sentry.captureException(
        data instanceof Error ? data : new Error(JSON.stringify(data))
      );
      break;
    case "debug":
      console.debug(formattedMessage);
      break;
    default:
      assertUnreachable(level);
  }
}

function assertUnreachable(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}

const logger = {
  info<T>(data: T): void {
    log("info", data);
    Sentry.addBreadcrumb({
      category: "info",
      message: JSON.stringify(data),
      level: "info",
    });
  },
  warn<T>(data: T): void {
    log("warn", data);
    Sentry.addBreadcrumb({
      category: "warn",
      message: JSON.stringify(data),
      level: "warning",
    });
  },
  error<T>(data: T): void {
    log("error", data);
    // Additional Sentry logic here if needed
  },
  debug<T>(data: T): void {
    log("debug", data);
    Sentry.addBreadcrumb({
      category: "debug",
      message: JSON.stringify(data),
      level: "debug",
    });
  },
};

export default logger;
