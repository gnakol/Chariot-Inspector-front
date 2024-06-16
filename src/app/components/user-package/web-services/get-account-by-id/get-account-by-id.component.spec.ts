import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAccountByIdComponent } from './get-account-by-id.component';

describe('GetAccountByIdComponent', () => {
  let component: GetAccountByIdComponent;
  let fixture: ComponentFixture<GetAccountByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAccountByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAccountByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
