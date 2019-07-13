import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.css']
})
export class ReplacementComponent implements OnInit {



  
  pageSection : string;
  pageNo = 1;
  replacementReqList :any = [];
  constructor(private AppService: AppService, private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  ngOnInit() {    
    this.pageSection ='list';
    this.getReplacementReqList();
  }

  getReplacementReqList(){
    this.pageSection ='list';
    this.AppService.getSubscriptionplanList().subscribe(data =>{
      if(data.length){
        this.replacementReqList = data;
      }
    })
  }

 
  ChangeReplacementReqStatus(obj:any,status:string){
    let updatedstatus = status == 'active'?'deactive':'active';
    
    let reqObj = Object.assign({},obj);
    reqObj.status = updatedstatus;
    this.AppService.editSubscriptionPlan(obj).subscribe(data =>{
      if(data.success){
        obj.status = updatedstatus;
        this.getReplacementReqList();
        this.toastr.success("Status Updated Successfully");
      }else{
        this.toastr.error("Error While Updating Status");
      }
    },(err)=>{
      this.toastr.error('Error While Adding Category');
    });
  }


}
