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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
var Roles_1 = __importDefault(require("../../Enums/Roles"));
var User_1 = __importDefault(require("../../Models/User"));
var UsersController = (function () {
    function UsersController() {
        this.userSchema = Validator_1.schema.create({
            firstName: Validator_1.schema.string({}, [Validator_1.rules.minLength(3), Validator_1.rules.maxLength(20)]),
            lastName: Validator_1.schema.string({}, [Validator_1.rules.minLength(3), Validator_1.rules.maxLength(20)]),
            email: Validator_1.schema.string([
                Validator_1.rules.unique({ table: "users", column: "email", caseInsensitive: true }),
                Validator_1.rules.email()
            ]),
            password: Validator_1.schema.string({}, [Validator_1.rules.minLength(5)]),
            phone: Validator_1.schema.string([Validator_1.rules.mobile({ strict: false })]),
            address: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.minLength(3),
                Validator_1.rules.maxLength(10)
            ]),
            roleId: Validator_1.schema.enum.optional(Object.values(Roles_1.default))
        });
        this.messages = {
            required: "{{ field }} is required",
            minLength: "{{ field }} must be at least {{ options.minLength }} characters long",
            maxLength: "{{ field }} cannot be longer than {{ options.maxLength }} characters long",
            "*": function (field, rule, arrayExpressionPointer, options) {
                return "".concat(field, " failed ").concat(rule, " validation");
            }
        };
    }
    UsersController.prototype.register = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var data, role, validatedData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = request.body();
                        role = data.role.toUpperCase();
                        data.roleId = Roles_1.default[role];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, request.validate({
                                schema: this.userSchema,
                                messages: this.messages,
                                data: data
                            })];
                    case 2:
                        validatedData = _b.sent();
                        User_1.default.create(validatedData);
                        return [2, response.ok({ message: "User created successfully" })];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        response.badRequest({ message: error_1.messages });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    UsersController.prototype.login = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response, auth = _a.auth;
        return __awaiter(this, void 0, void 0, function () {
            var _b, email, password, user, token, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.only(["email", "password"]), email = _b.email, password = _b.password;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        return [4, User_1.default.findBy("email", email)];
                    case 2:
                        user = _c.sent();
                        return [4, auth.use("api").revoke()];
                    case 3:
                        _c.sent();
                        return [4, auth.use("api").attempt(email, password, {
                                name: "Access Token",
                                expiresIn: "1 days"
                            })];
                    case 4:
                        token = _c.sent();
                        user.roleId = Roles_1.default[user.roleId];
                        response.ok({ token: token, user: user });
                        return [3, 6];
                    case 5:
                        error_2 = _c.sent();
                        console.log(error_2);
                        return [2, response.unauthorized("Invalid credentials")];
                    case 6: return [2];
                }
            });
        });
    };
    UsersController.prototype.updateUser = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var data, user, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = request.body();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4, User_1.default.findOrFail(params.id)];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            return [2, response.notFound({ message: "User not found" })];
                        }
                        return [4, user.merge(data).save()];
                    case 3:
                        _b.sent();
                        response.ok({ message: "User data updated " });
                        return [3, 5];
                    case 4:
                        error_3 = _b.sent();
                        console.log(error_3.messages.errors);
                        return [2, response.badRequest({ message: error_3.message })];
                    case 5: return [2];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map