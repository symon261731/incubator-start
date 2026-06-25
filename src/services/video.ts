import { videos } from "../db";
import { Video, VideoInfoDTO } from "../drivers/videos";

let nextId = 1;

export async function updateVideo(id: number, video: VideoInfoDTO) {
  videos[id] = video;
}

export async function addVideo(video: VideoInfoDTO): Promise<number> {
  const id = nextId++;
  videos[id] = video;
  return id;
}

export function findVideoById(id: number) {
  return videos[id];
}

export function resetAllVideos() {
  Object.keys(videos).forEach((key) => {
    delete videos[Number(key)];
  });
  nextId = 1;
}

export function getAllVideos() {
  return Object.entries(videos).reduce<Video[]>((acc, [key, data]) => {
    acc.push({ id: Number(key), ...data });

    return acc;
  }, []);
}

export function deleteVideo(id: number) {
  delete videos[id];
}
