import loggerUtil from "../util/logger";

const loggerOpt = { module: "bar" };

export function bar() {
  const logger = loggerUtil.child(loggerOpt);
  try {
    logger.info("START bar");
    throw new Error("unhandled error");
  } catch (error) {
    logger.error(error, "ERROR bar");
    throw error;
  }
}
