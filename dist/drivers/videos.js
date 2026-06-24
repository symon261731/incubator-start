"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableResolutionsEnum = void 0;
exports.validateVideoDTO = validateVideoDTO;
exports.validateVideoUpdateDTO = validateVideoUpdateDTO;
var availableResolutionsEnum;
(function (availableResolutionsEnum) {
    availableResolutionsEnum[availableResolutionsEnum["P144"] = 0] = "P144";
    availableResolutionsEnum[availableResolutionsEnum["P240"] = 1] = "P240";
    availableResolutionsEnum[availableResolutionsEnum["P360"] = 2] = "P360";
    availableResolutionsEnum[availableResolutionsEnum["P480"] = 3] = "P480";
    availableResolutionsEnum[availableResolutionsEnum["P720"] = 4] = "P720";
    availableResolutionsEnum[availableResolutionsEnum["P1080"] = 5] = "P1080";
    availableResolutionsEnum[availableResolutionsEnum["P1440"] = 6] = "P1440";
    availableResolutionsEnum[availableResolutionsEnum["P2160"] = 7] = "P2160";
})(availableResolutionsEnum || (exports.availableResolutionsEnum = availableResolutionsEnum = {}));
function validateVideoDTO(data) {
    const errors = [];
    const { title, author, availableResolutions, minAgeRestriction } = data;
    if (!title ||
        typeof title !== "string" ||
        title.trim().length < 2 ||
        title.trim().length > 15) {
        errors.push({ field: "title", message: "Invalid name" });
    }
    if (!author ||
        typeof author !== "string" ||
        author.trim().length < 2 ||
        author.trim().length > 15) {
        errors.push({ field: "author", message: "Invalid name" });
    }
    if (availableResolutions) {
        if (!Array.isArray(availableResolutions) ||
            !availableResolutions.every((r) => typeof r === "string" && r in availableResolutionsEnum)) {
            errors.push({
                message: "availableResolutions contains invalid values",
                field: "availableResolutions",
            });
        }
    }
    else {
        errors.push({
            message: "availableResolutions not includes",
            field: "availableResolutions",
        });
    }
    if (data.hasOwnProperty("minAgeRestriction") &&
        Number(data.minAgeRestriction) < 0) {
        errors.push({
            message: "minAgeRestriction must be greater than 0",
            field: "minAgeRestriction",
        });
    }
    return errors;
}
function validateVideoUpdateDTO(data) {
    const errors = [];
    const { title, author, availableResolutions } = data;
    if (!title ||
        typeof title !== "string" ||
        title.trim().length < 2 ||
        title.trim().length > 15) {
        errors.push({ field: "title", message: "Invalid name" });
    }
    if (!author ||
        typeof author !== "string" ||
        author.trim().length < 2 ||
        author.trim().length > 15) {
        errors.push({ field: "author", message: "Invalid name" });
    }
    if (availableResolutions) {
        if (!Array.isArray(availableResolutions) ||
            !availableResolutions.every((r) => typeof r === "string" && r in availableResolutionsEnum)) {
            errors.push({
                message: "availableResolutions contains invalid values",
                field: "availableResolutions",
            });
        }
    }
    else {
        errors.push({
            message: "availableResolutions not includes",
            field: "availableResolutions",
        });
    }
    if (data.hasOwnProperty("minAgeRestriction") &&
        Number(data.minAgeRestriction) < 0) {
        errors.push({
            message: "minAgeRestriction must be greater than 0",
            field: "minAgeRestriction",
        });
    }
    return errors;
}
