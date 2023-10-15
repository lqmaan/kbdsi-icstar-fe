import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbudgetingUpdateComponent } from './ebudgeting-update.component';

describe('EbudgetingUpdateComponent', () => {
  let component: EbudgetingUpdateComponent;
  let fixture: ComponentFixture<EbudgetingUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EbudgetingUpdateComponent]
    });
    fixture = TestBed.createComponent(EbudgetingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
