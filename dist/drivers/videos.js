"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableResolutionsEnum = void 0;
exports.validateVideoDTO = validateVideoDTO;
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
    const { title, author, availableResolutions } = data;
    if (title) {
        if (!title ||
            typeof title !== "string" ||
            title.trim().length < 2 ||
            title.trim().length > 15) {
            errors.push({ field: "title", message: "Invalid name" });
        }
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
    return errors;
}
