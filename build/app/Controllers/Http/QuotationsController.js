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
var Quotation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Quotation"));
var QuotationsController = (function () {
    function QuotationsController() {
    }
    QuotationsController.prototype.add = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var data, quotationSchema, messages, validatedData, quotation, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = request.body();
                        console.log("client data ", data);
                        quotationSchema = Validator_1.schema.create({
                            jobId: Validator_1.schema.number(),
                            requesterId: Validator_1.schema.number(),
                            price: Validator_1.schema.number(),
                            comments: Validator_1.schema.string.optional(),
                            status: Validator_1.schema.boolean.optional()
                        });
                        messages = {
                            required: "{{ field }} is required",
                            "*": function (field, rule, arrayExpressionPointer, options) {
                                return "".concat(field, " failed ").concat(rule, " validation");
                            }
                        };
                        return [4, request.validate({
                                schema: quotationSchema,
                                messages: messages,
                                data: data
                            })];
                    case 1:
                        validatedData = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4, Quotation_1.default.create(validatedData)];
                    case 3:
                        quotation = _b.sent();
                        response.ok({ data: quotation });
                        return [3, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.log(error_1);
                        response.badRequest({ message: error_1.messages });
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    QuotationsController.prototype.getQuationsByUserId = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var id, quotation, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = params.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, Quotation_1.default.query().where("requesterId", id)];
                    case 2:
                        quotation = _b.sent();
                        response.ok({ data: quotation });
                        return [3, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.log(error_2);
                        response.badRequest({ message: error_2.message });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    QuotationsController.prototype.getQuationsByJobId = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var id, quotation, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = params.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, Quotation_1.default.query().where("jobId", id)];
                    case 2:
                        quotation = _b.sent();
                        response.ok({ data: quotation });
                        return [3, 4];
                    case 3:
                        error_3 = _b.sent();
                        console.log(error_3);
                        response.badRequest({ message: error_3.message });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    QuotationsController.prototype.delete = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var id, quotation, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = params.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, Quotation_1.default.query().where("id", id).delete()];
                    case 2:
                        quotation = _b.sent();
                        response.ok({ data: quotation });
                        return [3, 4];
                    case 3:
                        error_4 = _b.sent();
                        console.log(error_4);
                        response.badRequest({ message: error_4.message });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    QuotationsController.prototype.update = function (_a, HttpContextContract) {
        var request = _a.request, response = _a.response, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var id, data, quotation, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = params.id;
                        data = request.body();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, Quotation_1.default.query().where("id", id).update(data)];
                    case 2:
                        quotation = _b.sent();
                        response.ok({ data: quotation });
                        return [3, 4];
                    case 3:
                        error_5 = _b.sent();
                        console.log(error_5);
                        response.badRequest({ message: error_5.message });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return QuotationsController;
}());
exports.default = QuotationsController;
//# sourceMappingURL=QuotationsController.js.map