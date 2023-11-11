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

/**
 * Centralized logging module providing a unified interface for logging messages
 * at different levels (info, warn, error, debug). This module abstracts
 * console logging, allowing for consistent message formatting and potential
 * future enhancements like log filtering, sending logs to external services,
 * or conditionally disabling logs for production builds.
 *
 * Usage:
 * ```
 * import logger from './logger';
 *
 * logger.info('This is an info message');
 * logger.warn('This is a warning');
 * logger.error('This is an error message');
 * logger.debug('This is a debug message');
 * ```
 */
const logger = {
  info<T>(data: T): void {
    log("info", data);
  },
  warn<T>(data: T): void {
    log("warn", data);
  },
  error<T>(data: T): void {
    log("error", data);
  },
  debug<T>(data: T): void {
    log("debug", data);
  },
};

export default logger;
