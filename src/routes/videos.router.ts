import { Router } from "express";
import { videos, addVideo, updateVideo } from "../db";
import {
  Video,
  VideoInfoDTO,
  validateVideoDTO,
  validateVideoUpdateDTO,
} from "../drivers/videos";

const videosRouter = Router();

videosRouter
  .get("", (_, res) => {
    const allVideos = Object.entries(videos).reduce<Video[]>(
      (acc, [key, data]) => {
        acc.push({ id: key, ...data });

        return acc;
      },
      [],
    );

    res.status(200).json(allVideos);

    return;
  })
  .get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const dbRes = videos[id];

      if (!!dbRes) {
        res.status(200).json(dbRes);

        return;
      }

      res.status(404).send("not found");
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  })
  .post("", async (req, res) => {
    try {
      const body = req.body;

      const validationResult = validateVideoDTO(body);

      if (!!validationResult.length) {
        res.status(400).json(validationResult);
        return;
      }

      const createdAt = new Date().toISOString();

      const {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate,
      } = body;

      const video: VideoInfoDTO = {
        author,
        createdAt,
        title,
        availableResolutions,
        canBeDownloaded: canBeDownloaded ?? false,
        minAgeRestriction,
        publicationDate,
      };

      await addVideo(crypto.randomUUID(), video);

      console.log("video created", video);
      res.status(201).json(video);
      return;
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const body = req.body;

      const validationResult = validateVideoUpdateDTO(body);

      if (!!validationResult.length) {
        res.status(400).json(validationResult);
        return;
      }

      const videoInfo = videos[id];

      if (!videoInfo) {
        res.status(404);
        return;
      }

      const updatedVideo: VideoInfoDTO = {
        ...videoInfo,
        ...body,
      };

      updateVideo(id, updatedVideo).then(() => {
        res.status(204);
      });

      console.log("video updated", updatedVideo);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = videos[id];

      if (video) {
        delete videos[id];
        res.status(204);

        return;
      }

      console.log("video deleted", id);

      res.status(404);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  });

export default videosRouter;
