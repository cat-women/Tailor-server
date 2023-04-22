"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSuite = exports.runnerHooks = exports.reporters = exports.plugins = void 0;
var TestUtils_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/TestUtils"));
var preset_adonis_1 = require("@japa/preset-adonis");
exports.plugins = [(0, preset_adonis_1.assert)(), (0, preset_adonis_1.runFailedTests)(), (0, preset_adonis_1.apiClient)()];
exports.reporters = [(0, preset_adonis_1.specReporter)()];
exports.runnerHooks = {
    setup: [function () { return TestUtils_1.default.ace().loadCommands(); }],
    teardown: [],
};
var configureSuite = function (suite) {
    if (suite.name === 'functional') {
        suite.setup(function () { return TestUtils_1.default.httpServer().start(); });
    }
};
exports.configureSuite = configureSuite;
//# sourceMappingURL=bootstrap.js.map