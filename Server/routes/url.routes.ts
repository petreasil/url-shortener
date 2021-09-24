import * as validUrl from "valid-url";
import * as shortId from "shortid";
import { baseUrl } from "../utils/utils";
import { UrlController } from "../controllers/url.controller";
import { UrlModel } from "../models/url.model";

export class UrlRoutes {
  urlcontroller = new UrlController();
  constructor() {}

  routes(app) {
    app.get("/", async (req, res) => {
      const list = await this.urlcontroller.getAll();
      res.send(list);
    });
    app.get("/:code", async (req, res) => {
      const code = req.params.code;
      console.log(code);

      const single = await this.urlcontroller.getUrl(code);
      console.log(single.longUrl);

      if (single) {
        res.json({ url: single.longUrl });
      } else {
        res.status(404).json("Url not found");
      }
    });

    app.post("/", async (req, res) => {
      const record = req.body;
      const urlCodeShort = shortId.generate();
      const shortUrl = baseUrl + "/" + urlCodeShort;
      const data = {
        urlCode: urlCodeShort,
        longUrl: record.longUrl,
        shortUrl: shortUrl,
      };

      if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid Url");
      }

      if (validUrl.isUri(record.longUrl)) {
        try {
          const record2 = new UrlModel(data);

          const recordLong = await this.urlcontroller.postUrl(record2);
          res.send(recordLong);
        } catch (err) {
          console.log(err);
        }
      }
    });

    app.delete("/:code", async (req, res) => {
      const code = req.params.code;
      await this.urlcontroller.deleteUrl(code);
      res.send("record Deleted");
    });
  }
}
