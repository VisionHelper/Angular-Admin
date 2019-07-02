import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { AppService } from '../app.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  pageSection : string;
  employer = {}
  constructor(private AppService: AppService,private router: Router, private route: ActivatedRoute) {
    this.AppService.setCurrentPage((this.router.url).split('/')[1]);
   }

  ngOnInit() {
         
    this.pageSection ='list';
  }

}
