"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
var User_1 = __importDefault(require("./User"));
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, Orm_1.column)({ isPrimary: true }),
        __metadata("design:type", Number)
    ], Role.prototype, "id", void 0);
    __decorate([
        (0, Orm_1.column)(),
        __metadata("design:type", String)
    ], Role.prototype, "name", void 0);
    __decorate([
        Orm_1.column.dateTime({ autoCreate: true }),
        __metadata("design:type", luxon_1.DateTime)
    ], Role.prototype, "createdAt", void 0);
    __decorate([
        Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
        __metadata("design:type", luxon_1.DateTime)
    ], Role.prototype, "updatedAt", void 0);
    __decorate([
        (0, Orm_1.hasMany)(function () { return User_1.default; }),
        __metadata("design:type", Object)
    ], Role.prototype, "users", void 0);
    return Role;
}(Orm_1.BaseModel));
exports.default = Role;
//# sourceMappingURL=Role.js.map