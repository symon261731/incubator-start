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
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: availableResolutionsEnum[];
}

export interface Video extends VideoInfoDTO {
  id: string | number;
}

export function validateVideoDTO(data: Record<string, any>) {
  const errors: { message: string; field: string }[] = [];
  const { title, author, availableResolutions } = data;

  if (title) {
    if (
      !title ||
      typeof title !== "string" ||
      title.trim().length < 2 ||
      title.trim().length > 15
    ) {
      errors.push({ field: "title", message: "Invalid name" });
    }
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
