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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlRoutes = void 0;
const validUrl = require("valid-url");
const shortId = require("shortid");
const utils_1 = require("../utils/utils");
const url_controller_1 = require("../controllers/url.controller");
const url_model_1 = require("../models/url.model");
class UrlRoutes {
    constructor() {
        this.urlcontroller = new url_controller_1.UrlController();
    }
    routes(app) {
        app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const list = yield this.urlcontroller.getAll();
            res.send(list);
        }));
        app.get("/:code", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const code = req.params.code;
            console.log(code);
            const single = yield this.urlcontroller.getUrl(code);
            console.log(single.longUrl);
            if (single) {
                res.json({ url: single.longUrl });
            }
            else {
                res.status(404).json("Url not found");
            }
        }));
        app.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const record = req.body;
            const urlCodeShort = shortId.generate();
            const shortUrl = utils_1.baseUrl + "/" + urlCodeShort;
            const data = {
                urlCode: urlCodeShort,
                longUrl: record.longUrl,
                shortUrl: shortUrl,
            };
            if (!validUrl.isUri(utils_1.baseUrl)) {
                return res.status(401).json("Invalid Url");
            }
            if (validUrl.isUri(record.longUrl)) {
                try {
                    const record2 = new url_model_1.UrlModel(data);
                    const recordLong = yield this.urlcontroller.postUrl(record2);
                    res.send(recordLong);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }));
        app.delete("/:code", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const code = req.params.code;
            yield this.urlcontroller.deleteUrl(code);
            res.send("record Deleted");
        }));
    }
}
exports.UrlRoutes = UrlRoutes;
