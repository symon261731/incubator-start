import { ErrorInformation } from "../core/types";

export enum availableResolutionsEnum {
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
}

export interface VideoInfoDTO {
  title: string;
  author: string;
  availableResolutions: availableResolutionsEnum[];
  createdAt: string;
  minAgeRestriction: number | null;
  publicationDate?: string;
  canBeDownloaded: boolean;
}

export interface Video extends VideoInfoDTO {
  id: number;
}

export function validateAddVideoData(data: VideoInfoDTO) {
  const errors: ErrorInformation[] = [];
  const { title, author, availableResolutions, minAgeRestriction } = data;

  if (!title || typeof title !== "string" || title.trim().length >= 40) {
    errors.push({ field: "title", message: "Invalid name" });
  }

  if (!author || typeof author !== "string" || author.trim().length >= 20) {
    errors.push({ field: "author", message: "Invalid name" });
  }

  if (availableResolutions) {
    if (
      !Array.isArray(availableResolutions) ||
      !availableResolutions.every(
        (r: any) => typeof r === "string" && r in availableResolutionsEnum,
      )
    ) {
      errors.push({
        message: "availableResolutions contains invalid values",
        field: "availableResolutions",
      });
    }
  } else {
    errors.push({
      message: "availableResolutions not includes",
      field: "availableResolutions",
    });
  }

  return errors;
}

export function validateVideoUpdateDTO(data: VideoInfoDTO) {
  const errors: ErrorInformation[] = [];
  const { title, author, availableResolutions, minAgeRestriction } = data;

  if (!title || typeof title !== "string" || title.trim().length >= 40) {
    errors.push({ field: "title", message: "Invalid name" });
  }

  if (!author || typeof author !== "string" || author.trim().length >= 20) {
    errors.push({ field: "author", message: "Invalid name" });
  }

  if (availableResolutions) {
    if (
      !Array.isArray(availableResolutions) ||
      !availableResolutions.every(
        (r: any) => typeof r === "string" && r in availableResolutionsEnum,
      )
    ) {
      errors.push({
        message: "availableResolutions contains invalid values",
        field: "availableResolutions",
      });
    }
  } else {
    errors.push({
      message: "availableResolutions not includes",
      field: "availableResolutions",
    });
  }

  if (
    minAgeRestriction &&
    (Number(minAgeRestriction) <= 0 || Number(minAgeRestriction) > 18)
  ) {
    errors.push({
      message: "minAgeRestriction must be between 1 and 18",
      field: "minAgeRestriction",
    });
  }

  if (!data.publicationDate || isNaN(Date.parse(data.publicationDate))) {
    errors.push({
      message: "publicationDate must be a valid date",
      field: "publicationDate",
    });
  }

  if (!data.createdAt || isNaN(Date.parse(data.createdAt))) {
    errors.push({
      message: "createdAt must be a valid date",
      field: "createdAt",
    });
  }

  return errors;
}
