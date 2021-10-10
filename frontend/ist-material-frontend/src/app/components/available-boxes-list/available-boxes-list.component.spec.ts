import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBoxesListComponent } from './available-boxes-list.component';

describe('AvailableBoxesListComponent', () => {
  let component: AvailableBoxesListComponent;
  let fixture: ComponentFixture<AvailableBoxesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableBoxesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableBoxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
