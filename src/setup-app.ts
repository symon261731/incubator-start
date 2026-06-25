import express, { Express } from "express";
import videosRouter from "./routes/videos.router";
import testingRouter from "./routes/testing.router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  // основной роут
  app.get("/", (_, res) => {
    res.status(200).send("Hello world!");
  });

  // /videos
  app.use("/videos", videosRouter);

  app.use("/testing", testingRouter);

  app.use((_, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
};
