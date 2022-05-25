import { TestBed } from '@angular/core/testing';

import { AggressorService } from './aggressor.service';

describe('AggressorService', () => {
  let service: AggressorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggressorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
