import { TestBed } from '@angular/core/testing';

import { TaurusService } from './taurus.service';

describe('TaurusService', () => {
  let service: TaurusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaurusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
