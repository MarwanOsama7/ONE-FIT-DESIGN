import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBannarComponent } from './main-bannar.component';

describe('MainBannarComponent', () => {
  let component: MainBannarComponent;
  let fixture: ComponentFixture<MainBannarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainBannarComponent]
    });
    fixture = TestBed.createComponent(MainBannarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
