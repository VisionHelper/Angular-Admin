import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from './app.constants'
import { Category } from './category/category';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  public subject = new Subject<any>();
  public currentPage = new Subject<any>();

  constructor(private router: Router, private http: HttpClient) {
    if (!sessionStorage.getItem('dataSource') || sessionStorage.getItem('dataSource') == 'false') {
      this.checkLogin(null);
      this.router.navigate(["/login"]);
    }
    /* this.myMethod$ = this.myMethodSubject.asObservable();*/
  }

  checkLogin(data) {
    console.log(data); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.subject.next(data);
  }

  setCurrentPage(page:string) {
    this.currentPage.next(page);
  }

  getCategory(): Observable<Category> {
    return this.http.get<Category>(AppConstants.category);
  }


  addCategory(categoryObj: any): Observable<Category> {
    return this.http.post<Category>(AppConstants.category, categoryObj);
  }

  editCategory(categoryObj: any): Observable<Category> {
    return this.http.put<Category>(AppConstants.category, categoryObj);
  }

  deleteCategory(categoryId: any) {
    const url = `${AppConstants.category}/${categoryId}`;
    return this.http.delete<any>(url);
  }

  getSubCategory(): Observable<any> {
    return this.http.get<any>(AppConstants.subCategory);
  }

  addSubCategory(SubcategoryObj:any): Observable<Category> {
    return this.http.post<any>(AppConstants.subCategory, SubcategoryObj);
  }

  editSubCategory(SubcategoryObj:any): Observable<Category> {
    return this.http.put<any>(AppConstants.subCategory, SubcategoryObj);
  }

  deleteSubCategory(SubcategoryId:any) : Observable<any>{
    const url = `${AppConstants.subCategory}/${SubcategoryId}`;
    return this.http.delete<any>(url);
  }

  getJobSeekersList():Observable<any>{
    return this.http.get(AppConstants.JobSeekers)
  }
  getCities(): Observable<any> {
    return this.http.get(AppConstants.cities);
  };

  addJobSeeker(JobSeekerObj:any): Observable<any> {
    if(!JobSeekerObj.jobseekerId){
      return this.http.post<any>(AppConstants.addJobseekerByAdmin, JobSeekerObj);
    }else{
      return this.http.post<any>(AppConstants.Jobseeker, JobSeekerObj);
    }
  }
  

  getSkills(): Observable<any> {
    return this.http.get(AppConstants.skills);
  }

  getCommonSkills(): Observable<any> {
    return this.http.get(AppConstants.commonSkills);
  }

  getJobSeekerSkill(id) :Observable<any>{
    const url = `${AppConstants.getJobSeekerSkills}/${id}`;
    return this.http.get(url);
  }

  addJobSeekerSkill(id:any,obj:any){
    const url = `${AppConstants.getJobSeekerSkills}/${id}`;
    return this.http.post(url,obj);
  }

  
  addJobSeekerCommanSkill(id:any,obj:any){
    const url = `${AppConstants.commonSkills}/${id}`;
    return this.http.post(url,obj);
  }

  getJobSeekerCommanSkill(id) :Observable<any>{
    const url = `${AppConstants.commonSkills}/${id}`;
    return this.http.get(url);
  }

  deleteJobSeeker(JobSeekerId:any) : Observable<any>{
    const url = `${AppConstants.JobSeekers}/${JobSeekerId}`;
    return this.http.delete<any>(url);
  }

  getEmployers():Observable<any>{
    return this.http.get(AppConstants.employer)
  }

  addEmployer(obj:any):Observable<any>{
    return this.http.post(AppConstants.addEmployerProfileByAdmin,obj)
  }

  editEmployer(obj:any):Observable<any>{
    return this.http.post(AppConstants.employer,obj)
  }

  deleteEmployer(employerId:any) : Observable<any>{
    const url = `${AppConstants.employer}/${employerId}`;
    return this.http.delete<any>(url);
  }

  getSubscriptionplanList():Observable<any>{
    return this.http.get(AppConstants.subscriptionplan);
  }

  addSubscriptionPlan(Obj:any): Observable<any>{
    return this.http.post(AppConstants.subscriptionplan,Obj);
  }

  editSubscriptionPlan(Obj:any): Observable<any>{
    return this.http.put(AppConstants.subscriptionplan,Obj);
  }

  ChangeSubscriptionPlanStatus(id:any, status:any): Observable<any>{
    const url = `${AppConstants.changeSubscriptionPlanStatus}/${id}`;
    return this.http.get(url,status);
  }

}
