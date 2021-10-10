import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRepairComponent } from './item-repair.component';

describe('ItemRepairComponent', () => {
  let component: ItemRepairComponent;
  let fixture: ComponentFixture<ItemRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
