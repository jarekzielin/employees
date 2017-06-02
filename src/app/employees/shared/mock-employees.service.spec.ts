import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http } from '@angular/http';

import { MockEmployeesService } from './mock-employees.service';

describe('MockEmployeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Http,
        MockBackend,
        MockEmployeesService
      ]
    });
  });

  it('should be created',
    inject([MockEmployeesService], (service: MockEmployeesService) => {
      expect(service).toBeTruthy();
    }));
});
