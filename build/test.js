"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
require("reflect-metadata");
var source_map_support_1 = __importDefault(require("source-map-support"));
var standalone_1 = require("@adonisjs/core/build/standalone");
var runner_1 = require("@japa/runner");
source_map_support_1.default.install({ handleUncaughtExceptions: false });
var kernel = new standalone_1.Ignitor(__dirname).kernel('test');
kernel
    .boot()
    .then(function () { return Promise.resolve().then(function () { return __importStar(require('./tests/bootstrap')); }); })
    .then(function (_a) {
    var runnerHooks = _a.runnerHooks, config = __rest(_a, ["runnerHooks"]);
    var app = [function () { return kernel.start(); }];
    (0, runner_1.configure)(__assign(__assign(__assign(__assign(__assign({}, kernel.application.rcFile.tests), (0, runner_1.processCliArgs)(process.argv.slice(2))), config), {
        importer: function (filePath) { return Promise.resolve().then(function () { return __importStar(require(filePath)); }); },
        setup: app.concat(runnerHooks.setup),
        teardown: runnerHooks.teardown,
    }), { cwd: kernel.application.appRoot }));
    (0, runner_1.run)();
});
//# sourceMappingURL=test.js.map