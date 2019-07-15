import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

declare var $ :any;
@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.css']
})
export class ReplacementComponent implements OnInit {
  
  pageSection : string;
  pageNo = 1;
  replacementReqList :any = [];
  reqStatusChangeObj :any = {};

  constructor(private AppService: AppService, private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  ngOnInit() {    
    this.pageSection ='list';
    this.getReplacementReqList();
  }

  getReplacementReqList(){
    this.AppService.getReplacementReqList().subscribe(data =>{
      if(data.success){
        this.replacementReqList = data.data;
      }
    })
  }

  getReason(obj:any,status:string){
    this.reqStatusChangeObj = {
      employerLeadsId : obj.employerLeadsId,
      employerSubscriptionId : obj.employerSubscriptionId,
      status : "REPLACEMENT",
      approveReason : null,
      type : status
    };
    if(status == "APPROVED" || status == "REJECTED"){
      $('#ReasonModel').modal('show');
    }else{
      this.ChangeReplacementReqStatus()
    }
  }

  ChangeReplacementReqStatus(){
    
    this.AppService.ChangeReplacementReqStatus(this.reqStatusChangeObj).subscribe(data =>{
      if(data.success){ 
      $('#ReasonModel').modal('hide');
        this.toastr.success("Status Updated Successfully");
      }else{
        this.getReplacementReqList();
        this.toastr.error("Error While Updating Status");
      }
    },(err)=>{
      this.getReplacementReqList();
      this.toastr.error("Error While Updating Status");
    });
  }


}
