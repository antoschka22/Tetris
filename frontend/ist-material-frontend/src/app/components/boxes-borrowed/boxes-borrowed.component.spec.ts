import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesBorrowedComponent } from './boxes-borrowed.component';

describe('BoxesBorrowedComponent', () => {
  let component: BoxesBorrowedComponent;
  let fixture: ComponentFixture<BoxesBorrowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxesBorrowedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxesBorrowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
