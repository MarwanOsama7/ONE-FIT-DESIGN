import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribingComponent } from './subscribing.component';

describe('SubscribingComponent', () => {
  let component: SubscribingComponent;
  let fixture: ComponentFixture<SubscribingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribingComponent]
    });
    fixture = TestBed.createComponent(SubscribingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
