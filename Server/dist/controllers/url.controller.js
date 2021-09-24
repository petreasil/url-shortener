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
exports.UrlController = void 0;
const admin = require("firebase-admin");
const url_model_1 = require("../models/url.model");
class UrlController {
    constructor() {
        this.db = admin.firestore();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsAll = yield this.db.collection("urlList").get();
            return itemsAll.docs.map((item) => new url_model_1.UrlModel(item.data()));
        });
    }
    getUrl(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleMatch = yield this.db
                .collection("urlList")
                .where("urlCode", "==", code)
                .get();
            return singleMatch.docs.map((item) => item.data())[0];
        });
    }
    deleteUrl(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db
                .collection("urlList")
                .where("urlCode", "==", code)
                .get();
            return res.forEach((element) => {
                element.ref.delete();
                console.log(`deleted: ${element.id}`);
            });
        });
    }
    postUrl(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsting = JSON.stringify(item);
            const ref = yield this.db.collection("urlList").add(JSON.parse(itemsting));
            const urlItem = yield this.db.collection("urlList").doc(ref.id).get();
            return new url_model_1.UrlModel(urlItem.data());
        });
    }
}
exports.UrlController = UrlController;
