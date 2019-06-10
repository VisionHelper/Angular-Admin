import { Component } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	islogin = false;
  constructor(private AppService:AppService, private router:Router, private activatedRoute : ActivatedRoute) {
  
  
  this.AppService.subject.subscribe((data) => {
               this.islogin = data; // And he have data here too!
            }
        );
    }

  ngOnInit() {
    if(sessionStorage.getItem('dataSource')){
      this.islogin = true;
    }
  }

  title = 'AdminPortal';

  logout():void{
    this.islogin = false;
    this.router.navigate(["/login"])
  }
  
}
