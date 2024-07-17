import { TestBed } from '@angular/core/testing';

import { AccountTeamService } from './account-team.service';

describe('AccountTeamService', () => {
  let service: AccountTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
