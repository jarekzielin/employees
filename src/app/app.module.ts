import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EmployeesModule } from './employees/employees.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    EmployeesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
