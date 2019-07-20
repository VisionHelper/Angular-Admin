
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { AppService } from "../app.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  User :any = {};
  constructor(private router: Router, private AppService:AppService, private toastr: ToastrService) {
  sessionStorage.setItem('dataSource', null);
  this.AppService.checkLogin(null);
   }

  ngOnInit() {

  }

  login():void {
    this.AppService.login(this.User).subscribe(data =>{
      if(data.success){
        this.toastr.success('Login Successfully');
        sessionStorage.setItem('dataSource', JSON.stringify(true));
        console.log(sessionStorage.getItem('dataSource'));
        if(sessionStorage.getItem('dataSource')=="true"){
          this.AppService.checkLogin("true");
          this.router.navigate(["/dashboard"])
        }
      }else{
          this.toastr.error('Invalid credentails');
        }
        
      },(err)=>{
        this.toastr.error('Technical Error');
      });
  
  }

}

