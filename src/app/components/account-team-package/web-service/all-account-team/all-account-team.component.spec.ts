import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAccountTeamComponent } from './all-account-team.component';

describe('AllAccountTeamComponent', () => {
  let component: AllAccountTeamComponent;
  let fixture: ComponentFixture<AllAccountTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAccountTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAccountTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
