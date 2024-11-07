import { TestBed } from '@angular/core/testing';

import {SATService} from './sat-service.service';

describe('SATServiceService', () => {
  let service: SATService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SATService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
