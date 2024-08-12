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
import axios_1 from "axios";
var BaseUrlType;
(function (BaseUrlType) {
    BaseUrlType[BaseUrlType["webapi"] = 0] = "webapi";
    BaseUrlType[BaseUrlType["local"] = 1] = "local";
})(BaseUrlType || (BaseUrlType = {}));
var Configurations = /** @class */ (function () {
    function Configurations() {
        var _this = this;
        this.getBaseUrl = function (key) {
            if (key === void 0) { key = "Local"; }
            return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getValue(key)];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        };
        /**
         * 获取配置文件数据
         * @param baseUrl 枚举，选择baseUrl类型
         * @returns 返回配置文件内容
         */
        this.getValue = function (key) { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get('/appSettings.json')];
                    case 1:
                        value = _a.sent();
                        return [2 /*return*/, value.data["ApiRoots"][key]];
                }
            });
        }); };
    }
    return Configurations;
}());
var configurations = (function () {
    return new Configurations();
})();
var AxiosHelper = /** @class */ (function () {
    function AxiosHelper() {
        this.http = axios_1.default.create({
        // baseURL: '',
        //timeout: 1000,
        // headers: {}
        });
        this.baseUrl = "/";
        //添加请求拦截器
        this.http.interceptors.request.use(function (config) {
            if (sessionStorage["token"] != null && sessionStorage["token"] != "") { // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.authorization = "Bearer " + sessionStorage["token"]; //请求头加上token
            }
            else
                config.headers.authorization = "Bearer " + localStorage["token"];
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        // 添加响应拦截器
        this.http.interceptors.response.use(function (res) {
            if (res.status == 214) {
                //Notify({ type: 'success', message: res.data });
                return res;
            }
            if (res.status == 203) {
                //Notify({ type: 'success', message: res.data });
                return res;
            }
            else {
                return res;
            }
        }, function (error) {
            return Promise.reject(error);
        });
    }
    /**
     * 将WebApi地址作为baseUrl
     * @returns 返回axios
     */
    AxiosHelper.prototype.useWebApi = function (apiRootKey) {
        if (apiRootKey === void 0) { apiRootKey = "Default"; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, configurations.getBaseUrl(apiRootKey)];
                    case 1:
                        _a.baseUrl = _b.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * 将本地地址作为baseUrl
     * @returns 返回axios
     */
    AxiosHelper.prototype.useLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, configurations.getBaseUrl()];
                    case 1:
                        _a.baseUrl = _b.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * 设置请求根目录
     */
    AxiosHelper.prototype.setBaseUrl = function () {
        this.http.defaults.baseURL = this.baseUrl;
    };
    AxiosHelper.prototype.get = function (request) {
        this.setBaseUrl();
        var res = this.http.get(request.url, { params: request.data });
        return res;
    };
    AxiosHelper.prototype.post = function (request) {
        this.setBaseUrl();
        return this.http.post(request.url, request.data);
    };
    AxiosHelper.prototype.put = function (request) {
        this.setBaseUrl();
        return this.http.put(request.url, request.data);
    };
    AxiosHelper.prototype.delete = function (request) {
        this.setBaseUrl();
        return this.http.delete(request.url, { params: request.data });
    };
    return AxiosHelper;
}());
export const superAxios = (function () {
    return new AxiosHelper();
})();
