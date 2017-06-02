import { Injectable } from '@angular/core';
import { Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { API_URL, EMPLOYEES_ENDPOINT } from './constants';

@Injectable()
export class MockEmployeesService {

  private url: string;

  constructor(private backend: MockBackend) {
    this.url = API_URL + EMPLOYEES_ENDPOINT;
  }

  public init(): void {
    this.backend.connections.subscribe((conn: MockConnection) => {

      let response: any;

      if (conn.request.url === this.url && conn.request.method === RequestMethod.Post) {
        const body: any = JSON.parse(conn.request.getBody());
        response = {
          firstName: body.firstName,
          lastName: body.lastName
        };
      } else if (conn.request.url === this.url && conn.request.method === RequestMethod.Get) {
        response = [{
          firstName: 'Luke',
          lastName: 'Skywalker'
        }, {
          firstName: 'Johny',
          lastName: 'English'
        }, {
          firstName: 'Rocky',
          lastName: 'Balboa'
        }];
      } else if (conn.request.method === RequestMethod.Delete) {
        response = {};
      }

      conn.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })));
    });
  }

}
