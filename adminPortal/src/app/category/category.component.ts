import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  
  constructor( private AppService: AppService) { }

  category : any = {};
  categories : any = []; 
  sub_Category = {};
  sub_Categories = [];
  p: number = 1;

  ngOnInit() {
    this.getCategory();
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

  deleteCategory(){
    
  }
  
  editCategory(category:any): void{
    this.category = Object.assign({},category);
    $("#add-Category").modal("show");
  }

  addSubCategory(): void{
    this.sub_Categories.push(this.sub_Category);
    $("#add-SubCategory").modal("hide");
    this.sub_Category = {};
  }

  editSubCategory(sub_Category:any): void{
    this.sub_Category = Object.assign({},sub_Category);
    $("#add-SubCategory").modal("show");

  }

  


}
