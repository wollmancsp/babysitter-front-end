import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleATransactionComponent } from './schedule-a-transaction.component';

describe('ScheduleATransactionComponent', () => {
  let component: ScheduleATransactionComponent;
  let fixture: ComponentFixture<ScheduleATransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleATransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleATransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
