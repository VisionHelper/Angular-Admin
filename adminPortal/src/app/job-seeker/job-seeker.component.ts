import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';
import { FilterbyPipe } from '../filterby.pipe';
import { element } from 'protractor';

declare var $ :any;

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.css']
})
export class JobSeekerComponent implements OnInit {

  pageSection : string;
  jobSeeker: any = {};
  jobSeekers = []
  pageNo = 1;
  constructor(private AppService :AppService, private router: Router, private route: ActivatedRoute,
      private spinner: NgxSpinnerService,private FilterbyPipe: FilterbyPipe) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }
  
  jobSeekersList : any = [];
  dropdownList : any = [];
  workAreasDetails : any = [];
  MultSelect : any= {};
  SkillDetailMultSelect : any= {};
  skillsDetails : any = [];
  selectedSkills :any = [];
  jobSeekerselectedSkills :any = [];
  CommonSkills :any = [];
  jobSeekerselectedCommonSkills :any = [];

  ngOnInit() {
    
    /** spinner starts on init */
    this.getJobSeekersList();
    this.getCities();
    this.getSkills();
    this.getCommonSkills();
    this.pageSection = 'list';
    this.jobSeeker.workAreas = [];
    this.jobSeeker.workAreas.push({"areaId": null,"areaName": null,"cityId": null, "cityName": null});


    this.MultSelect = { singleSelection: false, idField: 'categoryId', textField: 'categoryName', selectAllText: 'Select All',unSelectAllText: 'UnSelect All', itemsShowLimit: 5, allowSearchFilter: true};

    this.SkillDetailMultSelect = {singleSelection: false, idField: 'subCategoryId', textField: 'subCategoryName', selectAllText: 'Select All',unSelectAllText: 'UnSelect All', itemsShowLimit: 5, allowSearchFilter: true};

  };
  
  onItemSelect(item: any) {
    console.log(item);
  }

  getJobSeekersList(){
    this.AppService.getJobSeekersList().subscribe(data =>{
      if(data.success){
        this.jobSeekersList = data.data;
      }
    })
  }

  getCities(){
    this.AppService.getCities().subscribe(data =>{
      if(data.success){
        this.workAreasDetails = data.data;
      }
    });
  };

   
  getSkills(){
    this.AppService.getSkills().subscribe(data =>{
      if(data.success){
        this.skillsDetails = data.data.filter(item => (item.subCategories.length));
      }
    })
  };

  getCommonSkills(){
    this.AppService.getCommonSkills().subscribe(data =>{
      if(data.success){
        this.CommonSkills = data.data.filter(item => (item.subCategories.length));
      }

    });
  };


  addJobSeeker():void{
    console.log(this.jobSeeker);
    this.jobSeeker.isAdminVerified = true;
    this.jobSeeker.isAvailable = true;
    this.AppService.addJobSeeker(this.jobSeeker).subscribe(data =>{
      if(data.success){
      this.jobSeeker.jobseekerId = data.data.jobseekerId;
      this.getJobSeekerSkill(this.jobSeeker.jobseekerId);
      this.getJobSeekerSkill(this.jobSeeker.jobseekerId);
      $("Skills").show();
      }
    })
  };

  addJobSeekerSkill(){
    var obj = [];
      this.jobSeekerselectedSkills.forEach(element=> {
        element.forEach(selectedSkills=> {
          let temp = {
            jobseekerId : this.jobSeeker.jobseekerId,
            subCategoryId :selectedSkills.subCategoryId
          };
        obj.push(temp);
      });
    });
    if(obj.length>0){
      this.AppService.addJobSeekerSkill(this.jobSeeker.jobseekerId,obj).subscribe(data =>{
        // if(data.success){

        // }
      })
    }
  };

  getJobSeekerSkill(id:any){
    this.AppService.getJobSeekerSkill(this.jobSeeker.jobseekerId).subscribe(data =>{
      if(data.success){
        this.selectedSkills = data.data;
        this.jobSeekerselectedSkills = [];
        let jobSeekerSkillsArray = this.FilterbyPipe.transform(this.skillsDetails, 'skillsDetails', this.selectedSkills)
        this.selectedSkills.forEach(element => {
          if(element.subCategories.length){
            let index = jobSeekerSkillsArray.findIndex(item => item.categoryId === element.categoryId);
            this.jobSeekerselectedSkills[index]= element.subCategories;
          }
        });
      }
    })
  };


  addJobJobSeekerCommanSkils(){
    var obj = [];
      this.jobSeekerselectedCommonSkills.forEach(element=> {
       if(element !=undefined && element.length) {
          element.forEach(selectedCommanSkills=> {
              let temp = {
                jobseekerId : this.jobSeeker.jobseekerId,
                subCategoryId : selectedCommanSkills.subCategoryId
              };
            obj.push(temp);
          });
        }
    });
    if(obj.length>0){
      this.AppService.addJobSeekerCommanSkill(this.jobSeeker.jobseekerId,obj).subscribe(data =>{
        // if(data.success){

        // }
      })
    }
  };

  getJobSeekerCommanSkill(id:any){
    this.AppService.getJobSeekerCommanSkill(id).subscribe(data =>{
      if(data.success){
        this.jobSeekerselectedCommonSkills = [];
        data.data.forEach(element => {
          if(element.subCategories.length){
            let index = this.CommonSkills.findIndex( item => item.categoryId === element.categoryId);
            this.jobSeekerselectedCommonSkills[index]= element.subCategories;
          }
        });
      }
    })
  };

  editJobSeeker(jobSeeker:any):void{
    this.jobSeeker = Object.assign({},jobSeeker);
    this.getJobSeekerSkill(this.jobSeeker.jobseekerId);
    this.getJobSeekerCommanSkill(this.jobSeeker.jobseekerId);
    this.pageSection = 'add';
  };


  deleteJobSeeker(JobSeekerId){
    let isDelete = confirm("Are you sure you want to delete Category");
    if(isDelete==true){
      this.AppService.deleteEmployer(JobSeekerId).subscribe(data => {
        this.getJobSeekersList();
      });
    }
  };

  AddWorkAreas():void{
    this.jobSeeker.workAreas.push({ "areaId": null, "areaName": null, "cityId": null, "cityName": null})
  };

  removeCityArea(index:number):void{
    this.jobSeeker.workAreas.splice(index,1);
  }

}
