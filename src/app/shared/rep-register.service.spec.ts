import { TestBed } from '@angular/core/testing';

import { RepRegisterService } from './rep-register.service';

describe('RepRegisterService', () => {
  let service: RepRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
