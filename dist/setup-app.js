"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const videos_router_1 = __importDefault(require("./routes/videos.router"));
const setupApp = (app) => {
    app.use(express_1.default.json());
    // основной роут
    app.get("/", (_, res) => {
        res.status(200).send("Hello world!");
    });
    app.use("/hometask_01/api/videos", videos_router_1.default);
    app.use((_, res) => {
        res.status(404).json({ error: "Not found" });
    });
    return app;
};
exports.setupApp = setupApp;
