import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FABabysitterComponent } from './faBabysitter.component';

describe('FABabysitterComponent', () => {
  let component: FABabysitterComponent;
  let fixture: ComponentFixture<FABabysitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FABabysitterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FABabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
