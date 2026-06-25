import { Router } from "express";
import type { Request } from "express";
import {
  addVideo,
  updateVideo,
  getAllVideos,
  findVideoById,
  deleteVideo,
} from "../services/video";
import {
  Video,
  VideoInfoDTO,
  validateAddVideoData,
  validateVideoUpdateDTO,
} from "../drivers/videos";
import { ErrorInformation } from "../core/types";

const videosRouter = Router();

videosRouter
  .get("", async (_, res) => {
    try {
      const allVideos = getAllVideos();

      res.status(200).json(allVideos);
      return;
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const videoInfo = findVideoById(id);

      if (!!videoInfo) {
        res.status(200).json(videoInfo);

        return;
      }

      res.sendStatus(404);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  })
  .post(
    "",
    async (
      req: Request<{}, Video | ErrorInformation[], VideoInfoDTO, {}>,
      res,
    ) => {
      try {
        const body = req.body;

        const validationResult = validateAddVideoData(body);

        if (!!validationResult.length) {
          res.status(400).json(validationResult);
          return;
        }

        const video: VideoInfoDTO = {
          author: body.author,
          title: body.title,
          availableResolutions: body.availableResolutions,
          publicationDate: new Date(
            new Date().setDate(new Date().getDate() + 1),
          ).toISOString(),
          createdAt: new Date().toISOString(),
          canBeDownloaded: body.canBeDownloaded ?? false,
          minAgeRestriction: body.minAgeRestriction ?? null,
        };

        const id = await addVideo(video);

        res.status(201).json({ id, ...video });
        return;
      } catch (e) {
        console.error(e);
        res.sendStatus(500);
      }
    },
  )
  .put("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const body = req.body;

      const validationResult = validateVideoUpdateDTO(body);

      if (!!validationResult.length) {
        res.status(400).json(validationResult);
        return;
      }

      const videoInfo = findVideoById(id);

      if (!videoInfo) {
        res.status(404);
        return;
      }

      const updatedVideo: VideoInfoDTO = {
        ...videoInfo,
        ...body,
      };

      updateVideo(id, updatedVideo).then(() => {
        res.sendStatus(204);
      });

      console.log("video updated", updatedVideo);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = findVideoById(id);

      if (video) {
        deleteVideo(id);
        res.sendStatus(204);

        return;
      }
      console.log("video deleted", id);

      res.sendStatus(404);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

export default videosRouter;
