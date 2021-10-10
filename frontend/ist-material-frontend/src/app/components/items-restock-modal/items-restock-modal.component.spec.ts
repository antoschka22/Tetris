import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsRestockModalComponent } from './items-restock-modal.component';

describe('ItemsRestockModalComponent', () => {
  let component: ItemsRestockModalComponent;
  let fixture: ComponentFixture<ItemsRestockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsRestockModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsRestockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
