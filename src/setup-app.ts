import express, { Express } from "express";
import videosRouter from "./routes/videos.router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  // основной роут
  app.get("/", (_, res) => {
    res.status(200).send("Hello world!");
  });

  app.use("/hometask_01/api/videos", videosRouter);

  app.use((_, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
};
