import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBorrowModalComponent } from './items-borrow-modal.component';

describe('ItemsBorrowModalComponent', () => {
  let component: ItemsBorrowModalComponent;
  let fixture: ComponentFixture<ItemsBorrowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsBorrowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsBorrowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
