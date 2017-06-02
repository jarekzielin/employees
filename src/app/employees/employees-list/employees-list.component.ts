import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {

  @Input()
  public employees: Employee[];

  @Output()
  public deleteEmployee: EventEmitter<number>;

  constructor() {
    this.deleteEmployee = new EventEmitter<number>();
  }

  public onDelete(id: number): void {
    this.deleteEmployee.emit(id);
  }

}
