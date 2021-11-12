import { TestBed } from '@angular/core/testing';

import { AddJsService } from './add-js.service';

describe('AddJsService', () => {
  let service: AddJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
