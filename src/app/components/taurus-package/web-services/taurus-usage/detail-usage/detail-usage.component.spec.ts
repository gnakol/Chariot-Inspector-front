import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUsageComponent } from './detail-usage.component';

describe('DetailUsageComponent', () => {
  let component: DetailUsageComponent;
  let fixture: ComponentFixture<DetailUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
