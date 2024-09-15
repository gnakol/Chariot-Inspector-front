import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccountTeamComponent } from './detail-account-team.component';

describe('DetailAccountTeamComponent', () => {
  let component: DetailAccountTeamComponent;
  let fixture: ComponentFixture<DetailAccountTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailAccountTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAccountTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
