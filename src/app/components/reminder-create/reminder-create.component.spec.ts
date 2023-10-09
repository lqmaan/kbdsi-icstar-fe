import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderCreateComponent } from './reminder-create.component';

describe('ReminderCreateComponent', () => {
  let component: ReminderCreateComponent;
  let fixture: ComponentFixture<ReminderCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderCreateComponent]
    });
    fixture = TestBed.createComponent(ReminderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

