import { TestBed } from '@angular/core/testing';

import { BatteryUsageService } from './battery-usage.service';

describe('BatteryUsageService', () => {
  let service: BatteryUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatteryUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
