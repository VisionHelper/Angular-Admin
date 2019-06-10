

import { Injectable } from '@angular/core';

import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public subject = new Subject<any>();

    constructor() {
       /* this.myMethod$ = this.myMethodSubject.asObservable();*/
    }

    checkLogin(data) {
        console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        this.subject.next(data);
    }
}
