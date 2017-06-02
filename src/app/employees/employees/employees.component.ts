import { Component, OnInit } from '@angular/core';

import { Employee } from '../shared/employee';
import { EmployeesService } from '../shared/employees.service';
import { MockEmployeesService } from '../shared/mock-employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[];

  constructor(
    private employeesService: EmployeesService,
    private mockEmployeesService: MockEmployeesService
  ) {
    this.employees = [];
    this.mockEmployeesService.init();
  }

  public ngOnInit(): void {
    this.employeesService.get()
      .subscribe(employees => {
        employees.forEach(employee => {
          this.employees.push(
            new Employee(
              employee.firstName, employee.lastName));
        });
      });
  }

  public onAddEmployee(employee: Employee): void {
    this.employeesService.post(employee)
      .subscribe(res => {
        this.employees.push(employee);
      });
  }

  public onDeleteEmployee(id: number): void {
    this.employeesService.delete(id)
      .subscribe(res => {
        this.employees.splice(id, 1);
      });
  }

}
