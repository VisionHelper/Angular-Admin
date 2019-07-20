import { Component } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  islogin = false;
  pdfSrc: String;
  currentPage : any = "dashboard";
  referenceList :any = [];
  DashBoardCounts : any = [];
  constructor(private AppService:AppService, private router:Router,
     private activatedRoute : ActivatedRoute, private spinner: NgxSpinnerService) {
  
  
  
  this.AppService.subject.subscribe((data) => {
               this.islogin = data; // And he have data here too!
            }
        );
   
  this.AppService.currentPage.subscribe((data) => {
      this.currentPage = data; // And he have data here too!
    }
  );

  this.AppService.DashBoardCounts.subscribe((data) => {
      this.getDashBoardCounts();
    }
  );
}

  
  ngOnInit() {

    if(sessionStorage.getItem('dataSource')){
      this.islogin = true;
    }
    this.getDashBoardCounts();
   // this.pdfSrc = './assets/bank_stat_dec_2015.pdf';
  }

  getDashBoardCounts(){
   this.AppService.getDashBoardCount().subscribe(data =>{
     if(data.success){
       this.DashBoardCounts = data.data;
     }
   })
  }

  
  logout():void{
    this.islogin = false;
    this.router.navigate(["/login"])
  }
  
}
