import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnPage } from './learn-page';

describe('LearnPage', () => {
  let component: LearnPage;
  let fixture: ComponentFixture<LearnPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
