import { TestBed } from '@angular/core/testing';

import { BoxesServiceService } from './boxes-service.service';

describe('BoxesServiceService', () => {
  let service: BoxesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
