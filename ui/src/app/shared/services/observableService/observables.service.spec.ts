import { TestBed } from '@angular/core/testing';
import { ObservablesStreamService } from './observables.service';


describe('ObservablesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservablesStreamService = TestBed.get(ObservablesStreamService);
    expect(service).toBeTruthy();
  });
});
