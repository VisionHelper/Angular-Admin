import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.css']
})
export class JobSeekerComponent implements OnInit {

  pageSection : string;
  jobSeeker = {}
  jobSeekers = []
  constructor() { }

  ngOnInit() {
    this.pageSection = 'list'
  }

  addJobSeeker():void{
    this.jobSeekers.push(this.jobSeeker);
    this.jobSeeker = {};
    this.pageSection = 'list';
  };

  editJobSeeker(jobSeeker):void{
    this.pageSection = 'add';
    this.jobSeeker = Object.assign({},jobSeeker)
  }

}
