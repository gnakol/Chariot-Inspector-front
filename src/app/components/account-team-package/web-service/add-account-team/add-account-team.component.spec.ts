import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountTeamComponent } from './add-account-team.component';

describe('AddAccountTeamComponent', () => {
  let component: AddAccountTeamComponent;
  let fixture: ComponentFixture<AddAccountTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAccountTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
