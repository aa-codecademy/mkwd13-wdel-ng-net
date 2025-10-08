import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCardComponent } from './pizza-card.component';

describe('PizzaCardComponent', () => {
  let component: PizzaCardComponent;
  let fixture: ComponentFixture<PizzaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
