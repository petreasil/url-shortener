import * as admin from "firebase-admin";
import { UrlModel } from "../models/url.model";

export class UrlController {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }

  async getAll(): Promise<UrlModel[]> {
    const itemsAll = await this.db.collection("urlList").get();
    return itemsAll.docs.map((item) => new UrlModel(item.data()));
  }

  async getUrl(code: string) {
    const singleMatch = await this.db
      .collection("urlList")
      .where("urlCode", "==", code)
      .get();

    return singleMatch.docs.map((item) => item.data())[0];
  }

  async deleteUrl(code: any) {
    const res = await this.db
      .collection("urlList")
      .where("urlCode", "==", code)
      .get();

    return res.forEach((element) => {
      element.ref.delete();
      console.log(`deleted: ${element.id}`);
    });
  }
  async postUrl(item: UrlModel) {
    const itemsting = JSON.stringify(item);
    const ref = await this.db.collection("urlList").add(JSON.parse(itemsting));
    const urlItem = await this.db.collection("urlList").doc(ref.id).get();
    return new UrlModel(urlItem.data());
  }
}
