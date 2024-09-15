import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisineSuivisComponent } from './saisine-suivis.component';

describe('SaisineSuivisComponent', () => {
  let component: SaisineSuivisComponent;
  let fixture: ComponentFixture<SaisineSuivisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaisineSuivisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaisineSuivisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
