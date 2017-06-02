import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employees-input',
  templateUrl: './employees-input.component.html',
  styleUrls: ['./employees-input.component.scss']
})
export class EmployeesInputComponent {

  public employee: Employee;

  @Output()
  public addEmployee: EventEmitter<Employee>;

  @ViewChild('employeeForm')
  public employeeForm: NgForm;

  constructor() {
    this.employee = new Employee();
    this.addEmployee = new EventEmitter<Employee>();
  }

  public onSubmit(): void {
    this.addEmployee.emit(this.employee);
    this.employee = new Employee();
  }

}
