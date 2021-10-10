import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFunctionalComponent } from './item-functional.component';

describe('ItemFunctionalComponent', () => {
  let component: ItemFunctionalComponent;
  let fixture: ComponentFixture<ItemFunctionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFunctionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFunctionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
