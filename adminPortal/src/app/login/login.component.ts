
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { AppService } from "../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private AppService:AppService) {
  sessionStorage.setItem('dataSource', null);
  this.AppService.checkLogin(null);
   }

  ngOnInit() {
  }

  login():void {
  sessionStorage.setItem('dataSource', JSON.stringify(true));
  console.log(sessionStorage.getItem('dataSource'));
  if(sessionStorage.getItem('dataSource')=="true"){
    this.AppService.checkLogin("true");
    this.router.navigate(["/dashboard"])
  }
  }

}

