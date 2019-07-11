import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { EmployerComponent } from './employer/employer.component';
import { FilterbyPipe } from './filterby.pipe';
import { SubscriptionplanComponent } from './subscriptionplan/subscriptionplan.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoryComponent,
    JobSeekerComponent,
    EmployerComponent,
    FilterbyPipe,
    SubscriptionplanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    PdfViewerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added

  ],
  providers: [DatePipe,FilterbyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
