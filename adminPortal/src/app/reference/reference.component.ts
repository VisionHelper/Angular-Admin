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

  pageNo = 1;
  detailsPageNo = 1;
  referenceList :any = [];
  ReferenceDetails : any = [];
  constructor(private AppService: AppService, private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  ngOnInit() {    
    this.getReferenceList();
  }

  getReferenceList(){
    this.AppService.getReferenceList().subscribe(data =>{
      if(data.success){
        this.referenceList = data.data;
      }
    })
  }




}

