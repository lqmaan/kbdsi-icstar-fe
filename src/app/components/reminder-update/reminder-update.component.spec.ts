import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderUpdateComponent } from './reminder-update.component';

describe('ReminderUpdateComponent', () => {
  let component: ReminderUpdateComponent;
  let fixture: ComponentFixture<ReminderUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderUpdateComponent]
    });
    fixture = TestBed.createComponent(ReminderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
