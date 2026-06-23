import { Router } from "express";
import { videos, addVideo } from "../db";
import { Video, VideoInfoDTO, validateVideoDTO } from "../drivers/videos";

const videosRouter = Router();

videosRouter
  .get("", (req, res) => {
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
  .post("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const body = req.body;

      const validationResult = validateVideoDTO(body)

      if (!!validationResult.length) {
        res.status(400).json(validationResult)
      }


      if (videos[id]) {
        res.status(409);

        return;
      }

      const createdAt = new Date().toISOString();

      const video: VideoInfoDTO = {
        author: body
        createdAt,
      };

      addVideo(id, video).then(() => {
        res.status(200);
        return;
      });
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const videoInfo = videos[id];

      if (!videoInfo) {
        res.status(404);
        return;
      }
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
        res.status(200);

        return;
      }

      res.status(404);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  });

export default videosRouter;
