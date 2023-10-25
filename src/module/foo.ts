import loggerUtil from "../util/logger";
import { bar } from "./bar";

const loggerOpt = { module: "foo" };

export function foo() {
  const logger = loggerUtil.child(loggerOpt);
  logger.info("START foo");
}
export function fooThrow() {
  const child = loggerUtil.child(loggerOpt);
  try {
    child.info("START fooThrow");
    bar();
  } catch (error) {
    child.error(error, "ERROR fooThrow");
    throw error;
  }
}
