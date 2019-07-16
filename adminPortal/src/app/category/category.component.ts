import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
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
  
  constructor( private AppService: AppService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  category : any = {};
  categories : any = []; 
  sub_Category : any = {};
  sub_Categories : any = [];
  catPageNO : number = 1;
  sub_catPageNO : number = 1;

  ngOnInit() {
    this.getCategory();
    this.getSubCategory();
  }
  
  getCategory(){
    this.AppService.getCategory().subscribe(data => {
      this.categories = data.filter(item => item.type != 1);
    })
  }

  addCategory(): void{
    this.category.status = "Active";
    this.category.type = 0;
    if(!this.category.categoryId){
      this.AppService.addCategory(this.category).subscribe((data)=>{
        if(data.success){
          this.toastr.success('Category Added Successfully');
          $("#add-Category").modal("hide");
          this.category = new Category;
          this.getCategory();
        }else{
          this.toastr.error('Error While Adding Category');
        }
      },(err)=>{
        this.toastr.error('Error While Adding Category');
      });
    }else{
      this.AppService.editCategory(this.category).subscribe((data)=>{
        if(data.success){
          this.toastr.success('Category Updated Successfully');
          $("#add-Category").modal("hide");
          this.category = new Category;
          this.getCategory();
        }else{
          this.toastr.error('Error While Updating Category');
        } 
      },(err)=>{
          this.toastr.error('Error While Updating Category');
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
        if(data.success){
          this.toastr.success('Category Deleted Successfully');
          this.getCategory();
        }else{
          this.toastr.error('Error While Deleting Category');
        }
      },(err)=>{
        this.toastr.error('Error While Deleting Category');
      });
    }
  };
  
  getSubCategory(){
      this.AppService.getSubCategory(0).subscribe(data => {
      console.log(data);
      this.sub_Categories = data;
    })
  };

  addSubCategory(): void{
    this.sub_Category.status = "Active";
    if(!this.sub_Category.subCategoryId){
      this.AppService.addSubCategory(this.sub_Category).subscribe((data)=>{
        if(data.success){
          this.toastr.success('Sub-Category Added Successfully');
          $("#add-SubCategory").modal("hide");
          this.sub_Category = {};
          this.getSubCategory();
        }else{
          this.toastr.error('Error While Adding Sub-Category');
        }
        
      },(err)=>{
        this.toastr.error('Error While Adding Sub-Category');
      });
    }else{
      let reqObj = {
          "categoryId": this.sub_Category.categoryId,
          "deleted": true,
          "status": "Active",
          "subCategoryId": this.sub_Category.subCategoryId,
          "subCategoryName": this.sub_Category.subCategoryName
      };
      this.AppService.editSubCategory(reqObj).subscribe((data)=>{
        if(data.success){
          this.toastr.success('Sub-Category Updated Successfully');
          $("#add-SubCategory").modal("hide");
          this.sub_Category = {};
          this.getSubCategory();
        }else{
          this.toastr.error('Error While Updating Sub-Category');
        }
      },(err)=>{
        this.toastr.error('Error While Updating Sub-Category');
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
        if(data.success){
          this.toastr.success('Sub-Category Deleted Successfully');
          this.getSubCategory();
        }else{
          this.toastr.error('Error While Deleting Sub-Category');
        }
      },(err)=>{
        this.toastr.error('Error While Deleting Sub-Category');
      });
    }
  };
  


}
