import { TestBed } from '@angular/core/testing';

import { UrlendpointService } from './urlendpoint.service';

describe('UrlendpointService', () => {
  let service: UrlendpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlendpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
