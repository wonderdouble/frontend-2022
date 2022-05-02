import { TestBed } from '@angular/core/testing';

import { RepTransactionService } from './rep-transaction.service';

describe('RepTransactionService', () => {
  let service: RepTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
