import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedBoxesComponent } from './listed-boxes.component';

describe('ListedBoxesComponent', () => {
  let component: ListedBoxesComponent;
  let fixture: ComponentFixture<ListedBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedBoxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
