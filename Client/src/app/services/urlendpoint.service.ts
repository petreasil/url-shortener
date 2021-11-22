import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UrlModel } from '../models/url.model';

@Injectable()
export class UrlendpointService {
  recordSubject = new Subject<any[]>();
  recordsUrl: UrlModel[] = [];
  countRecords = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}

  getItemCount() {
    return this.countRecords;
  }

  addOneRecord(record: UrlModel): void {
    this.recordsUrl.push(record);
    this.recordSubject.next(this.recordsUrl);
    this.countRecords.next(this.countRecords.value + 1);
  }

  deleteOnerecord(code: string): void {
    const index = this.recordsUrl.findIndex((url) => url.urlCode === code);
    if (index !== -1) {
      this.recordsUrl.splice(index, 1);
      this.recordSubject.next(this.recordsUrl);
      this.countRecords.next(this.countRecords.value - 1);
    }
  }

  getAll() {
    return this.http.get('http://localhost:5000');
  }

  getOne(id: string | undefined): Observable<any> {
    return this.http.get(`http://localhost:5000/${id}`);
  }
  postData(url: UrlModel): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });

    return this.http.post('http://localhost:5000', url, {
      headers: httpHeaders,
    });
  }

  deleteData(code: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
    return this.http.delete(`http://localhost:5000/${code}`, {
      headers: httpHeaders,
    });
  }
}
