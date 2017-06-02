import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { EmployeesComponent } from './employees.component';
import { Employee } from '../shared/employee';
import { EmployeesService, IEmployee } from '../shared/employees.service';
import { MockEmployeesService } from '../shared/mock-employees.service';

class MockedEmployeesService {

  public post(): Observable<any> {
    return new Observable(o => {
      o.next({});
      o.complete();
    });
  }

  public get(): Observable<any> {
    return new Observable(o => {
      o.next([]);
      o.complete();
    });
  }

  public delete(): Observable<any> {
    return new Observable(o => {
      o.next({});
      o.complete();
    });
  }
}

describe('EmployeesComponent', () => {

  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let employeesService: EmployeesService;
  let mockEmployeesService: MockEmployeesService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ EmployeesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: EmployeesService,
          useClass: MockedEmployeesService
        },
        MockEmployeesService,
        MockBackend,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;

    employeesService = fixture.debugElement.injector.get(EmployeesService);
    mockEmployeesService = fixture.debugElement.injector.get(MockEmployeesService);

    fixture.detectChanges();
  });

  describe('component', () => {

    it('should be created', () => {

      expect(component).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {

    it('should get employees', () => {

      spyOn(employeesService, 'get')
        .and.returnValue(new Observable(o => {
          o.next([{
            firstName: 'Luke',
            lastName: 'Skywalker'
          }, {
            firstName: 'Frodo',
            lastName: 'Baggins'
          }]);
          o.complete();
        }));
      component.employees = [];

      component.ngOnInit();

      expect(employeesService.get).toHaveBeenCalled();
      expect(component.employees.length).toEqual(2);
      expect(component.employees[0].firstName).toEqual('Luke');
      expect(component.employees[1].lastName).toEqual('Baggins');
    });
  });

  describe('onAddEmployee', () => {

    it('should post new employee', () => {

      spyOn(employeesService, 'post')
        .and.returnValue(new Observable(o => {
          o.next({
            firstName: 'Luke',
            lastName: 'Skywalker'
          });
          o.complete();
        }));
      component.employees = [new Employee('Frodo', 'Baggins')];

      component.onAddEmployee(new Employee('Luke', 'Skywalker'));

      expect(employeesService.post)
        .toHaveBeenCalledWith(new Employee('Luke', 'Skywalker'));
      expect(component.employees.length).toEqual(2);
      expect(component.employees[0].firstName).toEqual('Frodo');
      expect(component.employees[1].firstName).toEqual('Luke');
    });
  });

  describe('onDeleteEmployee', () => {

    it('should delete an employee', () => {

      spyOn(employeesService, 'delete')
        .and.returnValue(new Observable(o => {
          o.next({});
          o.complete();
        }));
      component.employees = [
        new Employee('Frodo', 'Baggins'),
        new Employee('Luke', 'Skywalker'),
        new Employee('Rocky', 'Balboa'),
      ];

      component.onDeleteEmployee(1);

      expect(employeesService.delete).toHaveBeenCalledWith(1);
      expect(component.employees.length).toEqual(2);
      expect(component.employees[0].firstName).toEqual('Frodo');
      expect(component.employees[1].firstName).toEqual('Rocky');
    });
  });
});
