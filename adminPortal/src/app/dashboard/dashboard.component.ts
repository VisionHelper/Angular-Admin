import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  DashBoardCounts : any = [];
  constructor(private AppService: AppService, private router: Router, private route: ActivatedRoute) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]); 
   }

  ngOnInit() {
    this.getDashBoardCounts()
  }

  getDashBoardCounts(){
    this.AppService.getDashBoardCount().subscribe(data =>{
      if(data.success){
        this.DashBoardCounts = data.data;
      }
    })
   }

}
