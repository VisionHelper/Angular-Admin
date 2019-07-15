import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { CommonSkilsComponent } from './common-skils/common-skils.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { EmployerComponent } from './employer/employer.component';
import{ SubscriptionplanComponent } from './subscriptionplan/subscriptionplan.component';
import { ReplacementComponent } from './replacement/replacement.component';
import { ReferenceComponent } from './reference/reference.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'commonSkills', component: CommonSkilsComponent },
  { path: 'jobSeeker', component: JobSeekerComponent },
  { path: 'employer', component: EmployerComponent },
  { path: 'subscription', component: SubscriptionplanComponent },
  { path: 'replacement', component: ReplacementComponent },
  { path: 'reference', component: ReferenceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
