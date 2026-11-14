import { TestBed } from '@angular/core/testing';

import { StepDefApi } from './step-def';

describe('StepDefApi', () => {
  let service: StepDefApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepDefApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
