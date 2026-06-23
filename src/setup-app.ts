import express, { Express } from "express";

enum availableResolutionsEnum {
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
}

interface VideoInfo {
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: availableResolutionsEnum[];
}

export const setupApp = (app: Express) => {
  app.use(express.json());

  const videos: Record<string, VideoInfo> = {};

  // основной роут
  app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
  });

  app.get("/videos", (req, res) => {});

  app.post("/videos", (req, res) => {});

  app.get("/videos/:id", (req, res) => {});

  app.put("videos/:id", (req, res) => {});

  app.delete("videos/:id", (req, res) => {});

  return app;
};
