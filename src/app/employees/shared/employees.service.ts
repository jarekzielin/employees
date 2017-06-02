import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_URL, EMPLOYEES_ENDPOINT } from './constants';

export interface IEmployee {
  firstName: string;
  lastName: string;
}

@Injectable()
export class EmployeesService {

  private url: string;

  constructor(private http: Http) {
    this.url = API_URL + EMPLOYEES_ENDPOINT;
  }

  public get(): Observable<IEmployee[]> {

    return this.http.get(this.url, this.setHeaders())
      .map(res => <IEmployee[]> res.json())
      .catch(this.handleError);
  }

  public post(data: IEmployee): Observable<IEmployee> {

    const body = JSON.stringify(data);

    return this.http.post(this.url, body, this.setHeaders())
      .map(res => <IEmployee> res.json())
      .catch(this.handleError);
  }

  public delete(id: number): Observable<{}> {

    return this.http.delete(this.url + id, this.setHeaders())
      .map(res => <{}> res.json())
      .catch(this.handleError);
  }

  private setHeaders(): RequestOptions {

    const options = new RequestOptions({
      headers: new Headers()
    });

    options.headers.set('Content-Type', 'application/json');

    return options;
  }

  private handleError (error: Response) {

    return Observable.throw(error.json().error || 'Server error');
  }

}
