export class UrlModel {
  urlCode?: string;
  longUrl?: string;
  shortUrl?: string;

  constructor(obj?: undefined) {
    Object.assign(this, obj);
  }
}
