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
    return this.http.delete<any>(AppConstants.category, categoryId);
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
    return this.http.delete<any>(AppConstants.subCategory, SubcategoryId);
  }

  getCities(): Observable<any> {
    return this.http.get(AppConstants.cities);
  }

  getSkills(): Observable<any> {
    return this.http.get(AppConstants.skills);
  }



}
