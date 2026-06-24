import { TestBed } from '@angular/core/testing';

import { StepLog } from './step-log';

describe('StepLog', () => {
  let service: StepLog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepLog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
