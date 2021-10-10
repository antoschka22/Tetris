import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesListItemComponent } from './boxes-list-item.component';

describe('BoxesListItemComponent', () => {
  let component: BoxesListItemComponent;
  let fixture: ComponentFixture<BoxesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
