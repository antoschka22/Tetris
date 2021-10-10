import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRepairAllComponent } from './item-repair-all.component';

describe('ItemRepairAllComponent', () => {
  let component: ItemRepairAllComponent;
  let fixture: ComponentFixture<ItemRepairAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRepairAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRepairAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
