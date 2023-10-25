import logger, { initLogger } from "../util/logger";
import { v4 } from "uuid";

import context from "../util/async-context";
import { foo } from "../module/foo";
import { bar } from "../module/bar";

function worker() {
  const reqID = v4();
  const store = new Map<string, unknown>([
    ["logger", initLogger({ uuid: reqID, appname: "worker" })],
    ["request_id", reqID],
  ]);

  context.run(store, () => {
    logger.info("START worker");
    logger.info("Req ID: %s", context.getStore()?.get("request_id"));
    try {
      foo();
      bar();
    } catch (error) {
      logger.info(error, "ERROR worker");
    }
    logger.info("DONE worker");
  });
}

worker();
