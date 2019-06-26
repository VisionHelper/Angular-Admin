import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.css']
})
export class JobSeekerComponent implements OnInit {

  pageSection : string;
  jobSeeker: any = {};
  jobSeekers = []
  constructor(private AppService :AppService) { }

  dropdownList : any = [];
  selectedItems : any = [];
  workAreasDetails : any = [];
  MultSelect : any= {};
  singleSelect : any = {};

  ngOnInit() {
    this.getCities();
    this.pageSection = 'list';
    this.jobSeeker.workAreas = [];
    this.jobSeeker.workAreas.push({
      "areaId": null,
      "areaName": null,
      "cityId": null,
      "cityName": null
    });

    this.MultSelect = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'city',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownList = [
      { item_id: 1, city: 'Mumbai' },
      { item_id: 2, city: 'Bangaluru' },
      { item_id: 3, city: 'Pune' },
      { item_id: 4, city: 'Navsari' },
      { item_id: 5, city: 'New Delhi' }
    ];

    this.selectedItems = [
      { item_id: 3, city: 'Pune' },
      { item_id: 4, city: 'Navsari' }
    ];
    
    this.singleSelect = {
      singleSelection: true,
      idField: 'item_id',
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getCities(){
    this.AppService.getCities().subscribe(data =>{
      if(data.success){
        this.workAreasDetails = data.data;
      }
    });
  };

  
  getSkills(){
    this.AppService.getSkills().subscribe(skills =>{
      console.log(skills);
    })
  };

  addJobSeeker():void{
    console.log(this.jobSeeker);
    // this.jobSeeker = {};
    // this.pageSection = 'list';
  };

  editJobSeeker(jobSeeker:any):void{
    this.pageSection = 'add';
    this.jobSeeker = Object.assign({},jobSeeker)
  }

  AddWorkAreas():void{
    this.jobSeeker.workAreas.push({
      "areaId": null,
      "areaName": null,
      "cityId": null,
      "cityName": null
    })
  }
  removeCityArea(index:number):void{
    this.jobSeeker.AddCityArea.splice(index,1);
  }

}
