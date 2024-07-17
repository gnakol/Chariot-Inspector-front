import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountTeamComponent } from './delete-account-team.component';

describe('DeleteAccountTeamComponent', () => {
  let component: DeleteAccountTeamComponent;
  let fixture: ComponentFixture<DeleteAccountTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAccountTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
