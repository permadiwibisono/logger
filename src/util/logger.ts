import pino from "pino";

import context from "./async-context";

const pinoLogger = pino({
  level:
    process.env.NODE_ENV === "production"
      ? "info"
      : process.env.LOG_LEVEL || "debug",
  redact: ["email", "religion", "mobile_number", "name", "full_name"],
});

const logger = new Proxy(pinoLogger, {
  get(target, property, receiver) {
    target = context.getStore()?.get("logger") || target;
    return Reflect.get(target, property, receiver);
  },
});

export function initLogger(options?: Record<string, unknown>) {
  let log = pinoLogger;
  if (options && Object.keys(options).length) {
    log = pinoLogger.child(options);
  }
  return log;
}

export default logger;
