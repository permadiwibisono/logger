import express from "express";

import logger from "./util/logger";
import apiMW from "./middleware/api";

import { foo, fooThrow } from "./module/foo";
import { bar } from "./module/bar";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(apiMW);

app.get("/", (req, res) => {
  logger.info("GET /");
  return res
    .status(200)
    .json({ request_id: req.request_id, message: "hello world" });
});

app.get("/foo", (req, res) => {
  logger.info("GET /foo");
  foo();
  return res.status(200).json({ request_id: req.request_id, message: "foo" });
});

app.get("/my-foo-error", (req, res) => {
  try {
    logger.info("GET /my-foo-error");
    fooThrow();
    return res.status(200).json({ message: "hello" });
  } catch (error) {
    logger.error(error, "ERROR GET /my-foo-error");
    return res
      .status(500)
      .json({ request_id: req.request_id, message: "internal server error" });
  }
});

app.get("/my-bar-error", (req, res) => {
  try {
    logger.info("GET /my-bar-error");
    bar();
    return res.status(200).json({ message: "hello" });
  } catch (error) {
    logger.error(error, "ERROR GET /my-bar-error");
    return res
      .status(500)
      .json({ request_id: req.request_id, message: "internal server error" });
  }
});

app.use("*", (req, res) => {
  return res
    .status(404)
    .json({ request_id: req.request_id, message: "not found" });
});

app.listen(PORT, () => {
  logger.info(`Listening at port: ${PORT}`);
});
