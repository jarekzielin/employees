import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeesInputComponent } from './employees-input/employees-input.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesService } from './shared/employees.service';
import { MockEmployeesService } from './shared/mock-employees.service';

export function httpFactory(backend: MockBackend, options: BaseRequestOptions): Http {
  return new Http(backend, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    EmployeesComponent
  ],
  declarations: [
    EmployeesComponent,
    EmployeesInputComponent,
    EmployeesListComponent
  ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      deps: [ MockBackend, BaseRequestOptions ],
      useFactory: httpFactory
    },
    EmployeesService,
    MockEmployeesService,
  ]
})
export class EmployeesModule { }
