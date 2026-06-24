import { VideoInfoDTO } from "../drivers/videos";

export const videos: Record<string, VideoInfoDTO> = {};

export async function updateVideo(id: string | number, video: VideoInfoDTO) {
  videos[id] = video;
}

export async function addVideo(id: string | number, video: VideoInfoDTO) {
  videos[id] = video;
}
