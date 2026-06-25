import { Router } from "express";
import { resetAllVideos } from "../db";

const testingRouter = Router();

testingRouter.delete("/all-data", () => {
  resetAllVideos();
});

export default testingRouter;
