import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UrlModel } from '../models/url.model';

@Injectable()
export class UrlendpointService {
  recordSubject = new Subject<any[]>();
  countRecords = new BehaviorSubject(0);
  recordsUrl: any[] = [];

  constructor(private http: HttpClient) {}

  addOneRecord(record: any) {
    this.recordsUrl.push(record);
    this.recordSubject.next(this.recordsUrl);
  }

  deleteOnerecord(code: any) {
    const index = this.recordsUrl.findIndex((url) => url.urlCode === code);
    console.log(index);
    if (index !== -1) {
      this.recordsUrl.splice(index, 1);
      this.recordSubject.next(this.recordsUrl);
    }
  }

  getAll() {
    return this.http.get('http://localhost:5000');
  }

  getOne(id: any) {
    return this.http.get(`http://localhost:5000/${id}`);
  }
  postData(url: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });

    return this.http.post('http://localhost:5000', url, {
      headers: httpHeaders,
    });
  }

  deleteData(code: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
    return this.http.delete(`http://localhost:5000/${code}`, {
      headers: httpHeaders,
    });
  }
}
