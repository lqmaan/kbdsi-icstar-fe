import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbudgetingCreateComponent } from './ebudgeting-create.component';

describe('EbudgetingCreateComponent', () => {
  let component: EbudgetingCreateComponent;
  let fixture: ComponentFixture<EbudgetingCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EbudgetingCreateComponent]
    });
    fixture = TestBed.createComponent(EbudgetingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
