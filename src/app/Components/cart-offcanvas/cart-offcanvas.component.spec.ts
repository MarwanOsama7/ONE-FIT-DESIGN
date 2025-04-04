import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOffcanvasComponent } from './cart-offcanvas.component';

describe('CartOffcanvasComponent', () => {
  let component: CartOffcanvasComponent;
  let fixture: ComponentFixture<CartOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOffcanvasComponent]
    });
    fixture = TestBed.createComponent(CartOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
