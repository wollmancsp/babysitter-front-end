import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BABabysitterComponent } from './baBabysitter.component';

describe('BABabysitterComponent', () => {
  let component: BABabysitterComponent;
  let fixture: ComponentFixture<BABabysitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BABabysitterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BABabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
