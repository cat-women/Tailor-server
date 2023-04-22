"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var standalone_1 = require("@adonisjs/core/build/standalone");
var Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
exports.default = (0, standalone_1.listDirectoryFiles)(__dirname, Application_1.default.appRoot, ['./commands/index']);
//# sourceMappingURL=index.js.map