import { TestBed } from '@angular/core/testing';

import { ActionCarriedOutService } from './action-carried-out.service';

describe('ActionCarriedOutService', () => {
  let service: ActionCarriedOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionCarriedOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
