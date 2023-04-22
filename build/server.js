require('dotenv').config();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var source_map_support_1 = __importDefault(require("source-map-support"));
var standalone_1 = require("@adonisjs/core/build/standalone");
source_map_support_1.default.install({ handleUncaughtExceptions: false });
new standalone_1.Ignitor(__dirname).httpServer().start();
//# sourceMappingURL=server.js.map