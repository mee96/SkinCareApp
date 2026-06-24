import { TestBed } from '@angular/core/testing';

import { StepDef } from './step-def';

describe('StepDef', () => {
  let service: StepDef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepDef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
