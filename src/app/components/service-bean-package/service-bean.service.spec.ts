import { TestBed } from '@angular/core/testing';

import { ServiceBeanService } from './service-bean.service';

describe('ServiceBeanService', () => {
  let service: ServiceBeanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBeanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
