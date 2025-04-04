import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenAreaComponent } from './men-area.component';

describe('MenAreaComponent', () => {
  let component: MenAreaComponent;
  let fixture: ComponentFixture<MenAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenAreaComponent]
    });
    fixture = TestBed.createComponent(MenAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
