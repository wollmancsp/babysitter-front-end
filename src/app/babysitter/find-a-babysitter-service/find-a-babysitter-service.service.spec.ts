import { TestBed } from '@angular/core/testing';
import { FABService } from './find-a-babysitter-service.service';

describe('FABServiceService', () => {
  let service: FABService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FABService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
