import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UrlendpointService } from 'src/app/services/urlendpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  counter: BehaviorSubject<number>;
  constructor(private http: UrlendpointService) {
    this.counter = this.http.countRecords;
  }

  ngOnInit(): void {}
}
