"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const videos_1 = require("../drivers/videos");
const videosRouter = (0, express_1.Router)();
videosRouter
    .get("", (req, res) => {
    const allVideos = Object.entries(db_1.videos).reduce((acc, [key, data]) => {
        acc.push(Object.assign({ id: key }, data));
        return acc;
    }, []);
    res.status(200).json(allVideos);
    return;
})
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const dbRes = db_1.videos[id];
        if (!!dbRes) {
            res.status(200).json(dbRes);
            return;
        }
        res.status(404).send("not found");
    }
    catch (e) {
        console.error(e);
        res.status(500);
    }
}))
    .post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        const validationResult = (0, videos_1.validateVideoDTO)(body);
        if (!!validationResult.length) {
            res.status(400).json(validationResult);
        }
        if (db_1.videos[id]) {
            res.status(409);
            return;
        }
        const createdAt = new Date().toISOString();
        const video = {
            author: body,
            createdAt,
        };
        (0, db_1.addVideo)(id, video).then(() => {
            res.status(200);
            return;
        });
    }
    catch (e) {
        console.error(e);
        res.status(500);
    }
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const videoInfo = db_1.videos[id];
        if (!videoInfo) {
            res.status(404);
            return;
        }
    }
    catch (e) {
        console.error(e);
        res.status(500);
    }
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const video = db_1.videos[id];
        if (video) {
            delete db_1.videos[id];
            res.status(200);
            return;
        }
        res.status(404);
    }
    catch (e) {
        console.error(e);
        res.status(500);
    }
}));
exports.default = videosRouter;
