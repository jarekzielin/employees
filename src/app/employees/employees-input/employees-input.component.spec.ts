import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { EmployeesInputComponent } from './employees-input.component';
import { Employee } from '../shared/employee';

describe('EmployeesInputComponent', () => {

  let component: EmployeesInputComponent;
  let fixture: ComponentFixture<EmployeesInputComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ EmployeesInputComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(EmployeesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component', () => {

    it('should be created', () => {

      expect(component).toBeTruthy();
    });

    it('should create new employee', () => {

      expect(component.employee).toBeDefined();
      expect(component.employee.firstName).toEqual('');
      expect(component.employee.lastName).toEqual('');
    });

    it('should create an event emitter', () => {

      expect(component.addEmployee).toBeDefined();
    });

    it('should create an employee form', () => {

      expect(component.employeeForm).toBeDefined();
    });
  });

  describe('onSubmit', () => {

    it('should emit an employee', () => {

      spyOn(component.addEmployee, 'emit');
      component.employee = new Employee('Rocky', 'Balboa');

      component.onSubmit();

      expect(component.addEmployee.emit)
        .toHaveBeenCalledWith(new Employee('Rocky', 'Balboa'));
      expect(component.employee.firstName).toEqual('');
      expect(component.employee.lastName).toEqual('');
    });
  });
});
