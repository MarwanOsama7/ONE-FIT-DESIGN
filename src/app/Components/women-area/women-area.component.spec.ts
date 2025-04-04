import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenAreaComponent } from './women-area.component';

describe('WomenAreaComponent', () => {
  let component: WomenAreaComponent;
  let fixture: ComponentFixture<WomenAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WomenAreaComponent]
    });
    fixture = TestBed.createComponent(WomenAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
