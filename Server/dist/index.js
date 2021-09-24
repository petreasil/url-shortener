"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bobyparser = require("body-parser");
const corsLib = require("cors");
const path = require("path");
const admin = require("firebase-admin");
const url_routes_1 = require("./routes/url.routes");
//firebase
const adminconfig = {};
if (!process.env.PROD) {
    const config = require("../config/config.json");
    adminconfig.projectId = config["project_id"];
    adminconfig.privateKey = config["private_key"];
    adminconfig.clientEmail = config["client_email"];
}
else {
    adminconfig.projectId = process.env.PROJECT_ID;
    adminconfig.privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
    adminconfig.clientEmail = process.env.CLIENT_EMAIL;
}
admin.initializeApp({
    credential: admin.credential.cert(adminconfig),
});
//express config
const app = express();
app.use(corsLib());
app.use(bobyparser.json({ limit: "35mb" }));
app.use(bobyparser.urlencoded({ limit: "35mb", extended: false }));
//init static content
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
new url_routes_1.UrlRoutes().routes(app);
//init Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server running.."));
function cors() {
    throw new Error("Function not implemented.");
}
