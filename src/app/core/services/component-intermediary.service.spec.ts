import { TestBed } from '@angular/core/testing';

import { ComponentIntermediaryService } from './component-intermediary.service';

describe('ComponentIntermediaryService', () => {
  let service: ComponentIntermediaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentIntermediaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
