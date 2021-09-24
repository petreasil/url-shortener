import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { UrlModel } from 'src/app/models/url.model';
import { UrlendpointService } from 'src/app/services/urlendpoint.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-list-url',
  templateUrl: './list-url.component.html',
  styleUrls: ['./list-url.component.css'],
})
export class ListUrlComponent implements OnInit, OnDestroy {
  records: any[] = [];
  subscription = new Subscription();

  constructor(private urlendpoint: UrlendpointService) {}

  ngOnInit() {
    this.urlendpoint.getAll().subscribe((data) => {
      this.records = data as any[];
      this.urlendpoint.recordsUrl = data as any[];
      console.log(this.records);
    });
    this.subscription = this.urlendpoint.recordSubject.subscribe(
      (res) => (this.records = res)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(code: any) {
    console.log(code);

    this.urlendpoint
      .deleteData(code)
      .pipe(
        catchError((err) => {
          this.urlendpoint.deleteOnerecord(code);
          return of(undefined);
        })
      )
      .subscribe((data) => {
        this.urlendpoint.deleteOnerecord(code);
      });
  }
}
