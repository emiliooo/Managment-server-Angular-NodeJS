import { TestBed } from '@angular/core/testing';

import { ObservablesServiceService } from './observables-.service';

describe('ObservablesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservablesServiceService = TestBed.get(ObservablesServiceService);
    expect(service).toBeTruthy();
  });
});
