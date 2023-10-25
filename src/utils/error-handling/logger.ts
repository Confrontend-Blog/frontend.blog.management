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

function info<T>(data: T): void {
  log("info", data);
}

function warn<T>(data: T): void {
  log("warn", data);
}

function error<T>(data: T): void {
  log("error", data);
}

function debug<T>(data: T): void {
  log("debug", data);
}

export { debug, error, info, warn };
