import { Component } from '@angular/core';
import { UrlendpointService } from './services/urlendpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private urlService: UrlendpointService) {}
  title = 'urlShort';

  onAdd(record: any) {
    console.log(record);
    this.urlService.postData(record).subscribe((res) => {
      this.urlService.addOneRecord(res);
    });
  }
}
