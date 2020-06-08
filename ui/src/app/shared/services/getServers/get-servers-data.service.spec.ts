import { TestBed } from '@angular/core/testing';

import { GetServersDataService } from './get-servers-data.service';

describe('GetServersDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetServersDataService = TestBed.get(GetServersDataService);
    expect(service).toBeTruthy();
  });
});
