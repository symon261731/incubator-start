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
  minAgeRestriction?: number;
  publicationDate?: string;
  canBeDownloaded: boolean;
}

export interface Video extends VideoInfoDTO {
  id: string | number;
}

export function validateVideoDTO(data: Record<string, any>) {
  const errors: { message: string; field: string }[] = [];
  const { title, author, availableResolutions, minAgeRestriction } = data;

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2 ||
    title.trim().length > 15
  ) {
    errors.push({ field: "title", message: "Invalid name" });
  }

  if (
    !author ||
    typeof author !== "string" ||
    author.trim().length < 2 ||
    author.trim().length > 15
  ) {
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
    data.hasOwnProperty("minAgeRestriction") &&
    Number(data.minAgeRestriction) < 0
  ) {
    errors.push({
      message: "minAgeRestriction must be greater than 0",
      field: "minAgeRestriction",
    });
  }

  return errors;
}

export function validateVideoUpdateDTO(data: VideoInfoDTO) {
  const errors: { message: string; field: string }[] = [];
  const { title, author, availableResolutions } = data;

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2 ||
    title.trim().length > 15
  ) {
    errors.push({ field: "title", message: "Invalid name" });
  }

  if (
    !author ||
    typeof author !== "string" ||
    author.trim().length < 2 ||
    author.trim().length > 15
  ) {
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
    data.hasOwnProperty("minAgeRestriction") &&
    Number(data.minAgeRestriction) < 0
  ) {
    errors.push({
      message: "minAgeRestriction must be greater than 0",
      field: "minAgeRestriction",
    });
  }

  return errors;
}
