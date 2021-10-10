import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxItemListComponent } from './box-item-list.component';

describe('BoxItemListComponent', () => {
  let component: BoxItemListComponent;
  let fixture: ComponentFixture<BoxItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
