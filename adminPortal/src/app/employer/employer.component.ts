import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { FilterbyPipe } from '../filterby.pipe';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  pageSection : string;
  pageNo = 1;
  employerList:any = [];
  employer:any = {};
  OrignalemployerList: any;
  constructor(private AppService: AppService,private router: Router, private route: ActivatedRoute,
     private toastr: ToastrService,private FilterbyPipe: FilterbyPipe,) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  ngOnInit() {
    this.getEmployers()
  }

  getEmployers(){
    
    this.pageSection ='list';
    this.filter = {}
    this.AppService.getEmployers().subscribe(data =>{
      if(data.success){
          this.OrignalemployerList = Object.assign([],data.data);
          this.employerList = data.data;
      }
    });
    this.AppService.triggerDashBoardCount();
  }

  editEmployer(employer){
    this.employer = Object.assign({},employer);
    this.pageSection ='add';
  };

  addEmployer(){
    this.employer.notification = true;
    if(!this.employer.employerId){
      this.AppService.addEmployer(this.employer).subscribe(data =>{
        if(data.success){
          this.toastr.success('Employer Added Successfully');
          this.getEmployers();
        }
      })
    }else{
      this.AppService.editEmployer(this.employer).subscribe(data =>{
        if(data.success){
          this.toastr.success('Employer Updated Successfully');
          this.getEmployers();
        }
      })
    }
  };


  deleteEmployer(employerId){
    let isDelete = confirm("Are you sure you want to delete Category");
    if(isDelete==true){
      this.AppService.deleteEmployer(employerId).subscribe(data => {
         this.toastr.success('Employer Deleted Successfully');
         this.getEmployers();
      });
    }
  };

filter:any = {};

  filterEmployersLIst(){
    if(this.filter != undefined){
     this.employerList = this.FilterbyPipe.transform(this.OrignalemployerList, 'employerFilter', this.filter);
     console.log(this.employerList);
    }
  }

 
}
