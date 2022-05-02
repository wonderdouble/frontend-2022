import { TestBed } from '@angular/core/testing';

import { RepTrafficService } from './rep-traffic.service';

describe('RepTrafficService', () => {
  let service: RepTrafficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepTrafficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
