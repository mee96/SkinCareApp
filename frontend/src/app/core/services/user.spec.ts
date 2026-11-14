import { TestBed } from '@angular/core/testing';

import { UserApi } from './user';

describe('UserApi', () => {
  let service: UserApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
