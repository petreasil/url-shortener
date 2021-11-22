export class UrlModel {
  urlCode: string;
  longUrl: string;
  shortUrl: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
