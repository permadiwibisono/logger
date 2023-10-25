import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";

import context from "../util/async-context";
import { initLogger } from "../util/logger";

export default function appMW(req: Request, _: Response, next: NextFunction) {
  const reqID = v4();
  const logger = initLogger({ uuid: reqID, appname: "express-server" });
  const store = new Map<string, unknown>([
    ["logger", logger],
    ["request_id", reqID],
  ]);
  req.request_id = reqID;

  return context.run(store, next);
}
