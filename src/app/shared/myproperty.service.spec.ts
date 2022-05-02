import { TestBed } from '@angular/core/testing';

import { MypropertyService } from './myproperty.service';

describe('MypropertyService', () => {
  let service: MypropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MypropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
