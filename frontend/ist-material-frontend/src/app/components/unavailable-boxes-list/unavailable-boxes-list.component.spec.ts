import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableBoxesListComponent } from './unavailable-boxes-list.component';

describe('UnavailableBoxesListComponent', () => {
  let component: UnavailableBoxesListComponent;
  let fixture: ComponentFixture<UnavailableBoxesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnavailableBoxesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailableBoxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
