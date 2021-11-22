import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UrlModel } from 'src/app/models/url.model';
import { UrlendpointService } from 'src/app/services/urlendpoint.service';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css'],
})
export class UrlInputComponent implements OnInit {
  @ViewChild('inputForm')
  form!: any;
  contentBody = new UrlModel();
  @Output() formEmiter = new EventEmitter();

  constructor(private http: UrlendpointService) {}

  ngOnInit(): void {}

  submit(): void {
    this.formEmiter.emit(this.contentBody);
    this.form.reset();
  }
}
