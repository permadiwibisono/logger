import { AsyncLocalStorage } from "node:async_hooks";

export function createOrGetStore(ctx: AsyncLocalStorage<Map<string, any>>) {
  return ctx.getStore() || new Map<string, any>();
}

export function init(
  ctx: AsyncLocalStorage<Map<string, any>>,
  store: Map<string, any>,
  cb?: () => unknown
) {
  const initialized = ctx.getStore() !== undefined;
  let callback: () => unknown = () => {
    console.log("DONE init async-hooks");
  };
  if (cb) {
    callback = cb;
  }
  if (!initialized) {
    try {
      return ctx.run(store, callback);
    } catch (error) {
      console.log("ERROR init async-hooks", error);
    }
  }
  return callback();
}

const context = new AsyncLocalStorage<Map<string, any>>();

export default context;
