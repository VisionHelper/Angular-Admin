import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private AppService: AppService, private router: Router, private route: ActivatedRoute) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]); 
   }

  ngOnInit() {
    
  }

}
