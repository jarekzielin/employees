import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListComponent } from './employees-list.component';
import { Employee } from '../shared/employee';

describe('EmployeesListComponent', () => {

  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ EmployeesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;

    component.employees = [];

    fixture.detectChanges();
  });

  describe('component', () => {

    it('should be created', () => {

      expect(component).toBeTruthy();
    });

    it('should render proper header if there are no employees', () => {

      const compiled = fixture.debugElement.nativeElement;

      expect(component.employees).toEqual([]);
      expect(compiled.querySelector('h2').textContent)
        .toContain('No employees');
    });

    it('should render proper header if there are employees', () => {

      const compiled = fixture.debugElement.nativeElement;
      component.employees.push(
        new Employee('Jack', 'Danniels')
      );

      fixture.detectChanges();

      expect(compiled.querySelector('h2').textContent)
        .toContain('List of employees');
    });
  });

  describe('onDelete', () => {

    it('should delete an employee', () => {

      spyOn(component.deleteEmployee, 'emit');

      component.onDelete(12);

      expect(component.deleteEmployee.emit)
        .toHaveBeenCalledWith(12);
    });
  });
});
