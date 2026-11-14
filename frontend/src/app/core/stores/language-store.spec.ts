import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { LanguageStore } from './language-store';

describe('LanguageStore', () => {
  let service: LanguageStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTranslateService()],
    });
    service = TestBed.inject(LanguageStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
