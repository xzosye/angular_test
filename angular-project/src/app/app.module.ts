import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // นำเข้า CommonModule

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PerformanceComponent } from './performance/performance.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { AddTaskPopupComponent } from './add-task-popup/add-task-popup.component';

import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColumComponent } from './colum/colum.component';
import { DonutComponent } from './donut/donut.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    ManagerComponent,
    UserComponent,
    PerformanceComponent,
    AddMemberComponent,
    AddTaskPopupComponent,
    ColumComponent,
    DonutComponent

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    DateInputsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,

    
  ],
  providers: [AuthService, AuthGuard], // Make sure AuthGuard is listed here
  bootstrap: [AppComponent],
})
export class AppModule {}
