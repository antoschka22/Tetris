import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListModalComponent } from './items-list-modal.component';

describe('ItemsListModalComponent', () => {
  let component: ItemsListModalComponent;
  let fixture: ComponentFixture<ItemsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
