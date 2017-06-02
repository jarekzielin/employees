import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  HttpModule, XHRBackend,
  ResponseOptions, Response, RequestMethod,
} from '@angular/http';

import { EmployeesService, IEmployee } from './employees.service';

describe('EmployeesService', () => {

  let mockbackend: any, service: EmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        EmployeesService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    });
  });

  beforeEach(
    fakeAsync(
      inject(
        [XHRBackend, EmployeesService],
        (mockBackend: XHRBackend, employeesService: EmployeesService) => {
          service = employeesService;
          mockbackend = mockBackend;
        })));

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  describe('post', () => {

    it('should post new employee', () => {

      let response: IEmployee;
      let connection: MockConnection;
      mockbackend.connections.subscribe((conn: MockConnection) => {
        const options = new ResponseOptions({
          status: 200,
          body: JSON.stringify({
            firstName: 'John',
            lastName: 'Rambo'
          }),
        });

        conn.mockRespond(new Response(options));
        connection = conn;
      });

      service.post({
        firstName: 'John',
        lastName: 'Rambo'
      }).subscribe(res => {
          response = res;

          expect(connection.request.url).toEqual(
            'http://localhost:8000/employees/');
          expect(connection.request.getBody()).toEqual(
            JSON.stringify({
              firstName: 'John',
              lastName: 'Rambo'
            }));
          expect(
            connection.request.method
          ).toBe(RequestMethod.Post);
        });

      expect(response).toEqual({
        firstName: 'John',
        lastName: 'Rambo'
      });
    });

  });

  describe('get', () => {

    it('should get employees', () => {

      let response: IEmployee[];
      let connection: MockConnection;
      mockbackend.connections.subscribe((conn: MockConnection) => {
        const options = new ResponseOptions({
          status: 200,
          body: JSON.stringify([{
            firstName: 'Luke',
            lastName: 'Skywalker'
          }, {
            firstName: 'Johny',
            lastName: 'English'
          }, {
            firstName: 'Rocky',
            lastName: 'Balboa'
          }]),
        });

        conn.mockRespond(new Response(options));
        connection = conn;
      });

      service.get()
        .subscribe(res => {
          response = res;

          expect(connection.request.url).toEqual(
            'http://localhost:8000/employees/');
          expect(connection.request.getBody()).toEqual('');
          expect(
            connection.request.method
          ).toBe(RequestMethod.Get);
        });

      expect(response).toEqual([{
        firstName: 'Luke',
        lastName: 'Skywalker'
      }, {
        firstName: 'Johny',
        lastName: 'English'
      }, {
        firstName: 'Rocky',
        lastName: 'Balboa'
      }]);
    });

  });

  describe('delete', () => {

    it('should delete an employee', () => {

      let response: Object;
      let connection: MockConnection;
      mockbackend.connections.subscribe((conn: MockConnection) => {
        const options = new ResponseOptions({
          status: 200,
          body: JSON.stringify({}),
        });

        conn.mockRespond(new Response(options));
        connection = conn;
      });

      service.delete(12)
        .subscribe(res => {
          response = res;

          expect(connection.request.url).toEqual(
            'http://localhost:8000/employees/12');
          expect(connection.request.getBody()).toEqual('');
          expect(
            connection.request.method
          ).toBe(RequestMethod.Delete);
        });

      expect(response).toEqual({});
    });

  });

});
