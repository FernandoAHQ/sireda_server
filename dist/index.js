"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_model_1 = require("./models/server.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
new server_model_1.Server().init();
