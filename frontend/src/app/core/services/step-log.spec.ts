import { TestBed } from '@angular/core/testing';

import { StepLogApi } from './step-log';

describe('StepLogApi', () => {
  let service: StepLogApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepLogApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
