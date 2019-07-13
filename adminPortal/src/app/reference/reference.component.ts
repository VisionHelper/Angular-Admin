import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {


  
  pageSection : string;
  pageNo = 1;
  subscriptionPlanList :any = [];
  subscriptionPlan :any = {};
  constructor(private AppService: AppService, private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  ngOnInit() {    
    this.pageSection ='list';
    this.getSubscriptionplanList();
  }

  getSubscriptionplanList(){
    this.pageSection ='list';
    this.AppService.getSubscriptionplanList().subscribe(data =>{
      if(data.length){
        this.subscriptionPlanList = data;
      }
    })
  }

  
  editSubscriptionplan(Subscriptionplan){
    this.subscriptionPlan = Object.assign({},Subscriptionplan);
    this.pageSection ='add';
  };

  addSubscriptionPlan(){
    
    if(!this.subscriptionPlan.subscriptionPlanId){
      this.subscriptionPlan.status = "active";
     // this.subscriptionPlan.createdDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
        this.AppService.addSubscriptionPlan(this.subscriptionPlan).subscribe(data =>{
          if(data.success){
            this.toastr.success("SubscriptionPlan Added Successfully");
            this.getSubscriptionplanList();
          }else{
            this.toastr.error("Error While Adding  SubscriptionPlan");
          }
        })
    }else{
      //  this.subscriptionPlan.updatedDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
        this.AppService.editSubscriptionPlan(this.subscriptionPlan).subscribe(data =>{
          if(data.success){
            this.getSubscriptionplanList();
            this.toastr.success("SubscriptionPlan Updated Successfully");
          }else{
            this.toastr.error("Error While Updating SubscriptionPlan");
          }
        })
    }
  }

  ChangeSubscriptionPlanStatus(obj:any,status:string){
    let updatedstatus = status == 'active'?'deactive':'active';
    
    let reqObj = Object.assign({},obj);
    reqObj.status = updatedstatus;
    this.AppService.editSubscriptionPlan(obj).subscribe(data =>{
      if(data.success){
        obj.status = updatedstatus;
        this.getSubscriptionplanList();
        this.toastr.success("Status Updated Successfully");
      }else{
        this.toastr.error("Error While Updating Status");
      }
    })
  }


}

