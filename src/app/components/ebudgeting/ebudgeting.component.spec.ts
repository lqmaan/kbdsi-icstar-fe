import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbudgetingComponent } from './ebudgeting.component';

describe('EbudgetingComponent', () => {
  let component: EbudgetingComponent;
  let fixture: ComponentFixture<EbudgetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EbudgetingComponent]
    });
    fixture = TestBed.createComponent(EbudgetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
