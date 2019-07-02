import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { AppService } from '../app.service';
import { Category } from './category';
import { from } from 'rxjs';

declare var $ :any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  constructor( private AppService: AppService, private router: Router, private route: ActivatedRoute) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  category : any = {};
  categories : any = []; 
  sub_Category : any = {};
  sub_Categories : any = [];
  p: number = 1;

  ngOnInit() {
    this.getCategory();
    this.getSubCategory();
  }
  
  getCategory(){
    this.AppService.getCategory().subscribe(data => {
      console.log(data);
      this.categories = data;
    })
  }

  addCategory(): void{
    this.category.createdDate = "2010-12-22 02:05:23";
    this.category.updatedDate = "2010-12-22 02:05:23";
    this.category.status = "Active";
    if(!this.category.categoryId){
      this.AppService.addCategory(this.category).subscribe((data)=>{
      $("#add-Category").modal("hide");
      this.category = new Category;
      this.getCategory();
      });
    }else{
      this.AppService.editCategory(this.category).subscribe((data)=>{
      $("#add-Category").modal("hide");
      this.category = new Category;
      this.getCategory();
      });
    }
  }

  
  editCategory(category:any): void{
    this.category = Object.assign({},category);
   // $("#add-Category").modal("show");
  };

  deleteCategory(categoryId:any){
    let isDelete = confirm("Are you sure you want to delete Category");
    if(isDelete==true){
      this.AppService.deleteCategory(categoryId).subscribe(data => {
         this.getCategory();
      });
    }
  };
  
  getSubCategory(){
      this.AppService.getSubCategory().subscribe(data => {
      console.log(data);
      this.sub_Categories = data;
    })
  };

  addSubCategory(): void{
    this.sub_Category.createdDate = "2010-12-22 02:05:23";
    this.sub_Category.updatedDate = "2010-12-22 02:05:23";
    this.sub_Category.status = "Active";
    if(!this.sub_Category.subCategoryId){
      this.AppService.addSubCategory(this.sub_Category).subscribe((data)=>{
        $("#add-SubCategory").modal("hide");
      this.sub_Category = {};
      this.getSubCategory();
      });
    }else{
      this.AppService.editSubCategory(this.sub_Category).subscribe((data)=>{
        $("#add-SubCategory").modal("hide");
      this.sub_Category = {};
      this.getSubCategory();
      });
    }
  };

  editSubCategory(sub_Category:any): void{
    this.sub_Category = Object.assign({},sub_Category);
    //$("#add-SubCategory").modal("show");
  };

  deleteSubCategory(subCategoryId:any){
    let isDelete = confirm("Are you sure you want to delete Sub Category");
    if(isDelete==true){
      this.AppService.deleteSubCategory(subCategoryId).subscribe(data => {
         this.getSubCategory();
      });
    }
  };
  


}
