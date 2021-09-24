import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { UrlModel } from 'src/app/models/url.model';
import { UrlendpointService } from 'src/app/services/urlendpoint.service';

@Component({
  selector: 'app-single-url',
  templateUrl: './single-url.component.html',
  styleUrls: ['./single-url.component.css'],
})
export class SingleUrlComponent implements OnInit {
  @Input() record: UrlModel = {};
  @Output() deleteSingleUrl = new EventEmitter();

  constructor(private http: UrlendpointService) {}

  ngOnInit(): void {}

  redirectToUrl() {
    console.log(this.record.urlCode);
    this.http.getOne(this.record.urlCode).subscribe((res) => {
      const url = res as { url: string };
      console.log(res);
      window.open(url.url, '_blank');
    });
  }

  deleteId(code: any) {
    this.deleteSingleUrl.emit(code);
  }
}
