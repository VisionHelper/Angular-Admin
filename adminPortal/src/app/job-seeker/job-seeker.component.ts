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

  dropdownList = [];
  selectedItems = [];
  MultSelect = {};
  singleSelect = {};

  ngOnInit() {
    this.getCites();
    this.pageSection = 'list';
    this.jobSeeker.AddCityArea = [];
    this.jobSeeker.AddCityArea.push({
      city:'',
      area:''
    });

    this.dropdownList = [
      { item_id: 1, cit: 'Mumbai' },
      { item_id: 2, city: 'Bangaluru' },
      { item_id: 3, cit: 'yPune' },
      { item_id: 4, city: 'Navsari' },
      { item_id: 5, city: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, city: 'Pune' },
      { item_id: 4, city: 'Navsari' }
    ];
    this.MultSelect = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'city',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
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

  getCites(){
    this.AppService.getCites().subscribe(cities =>{
      console.log(cities);
    })
  }

  addJobSeeker():void{
    this.jobSeekers.push(this.jobSeeker);
    this.jobSeeker = {};
    this.pageSection = 'list';
  };

  editJobSeeker(jobSeeker:any):void{
    this.pageSection = 'add';
    this.jobSeeker = Object.assign({},jobSeeker)
  }

  AddCityArea():void{
    this.jobSeeker.AddCityArea.push({
      city:'',
      area:''
    })
  }
  removeCityArea(index:number):void{
    this.jobSeeker.AddCityArea.splice(index,1);
  }

}
