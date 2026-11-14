import { TestBed } from '@angular/core/testing';

import { ConcernApi } from './concern';

describe('ConcernApi', () => {
  let service: ConcernApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcernApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
