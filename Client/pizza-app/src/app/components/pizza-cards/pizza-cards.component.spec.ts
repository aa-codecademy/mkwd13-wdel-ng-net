import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCardsComponent } from './pizza-cards.component';

describe('PizzaCardsComponent', () => {
  let component: PizzaCardsComponent;
  let fixture: ComponentFixture<PizzaCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
