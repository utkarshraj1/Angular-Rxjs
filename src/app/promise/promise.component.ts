import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {

  isResolved!: boolean;
  promiseExample1!: Promise<any>;
  popupValue!: boolean;
  constructor() { }

  ngOnInit(): void {

    this.isResolved = true;
  }

  changeValue(inp: boolean): void {

    this.isResolved = inp;
  }

  definiteEvent(): void {

    console.log("This is a definite event");
  }

  promiseCalled(): void {

    this.promiseExample1 = new Promise((resolve, reject) => {
      this.isResolved ? resolve("Hi bro, the promise is resolved successfully!!")
        : reject("Oops bro, the promise is rejected!!");
    });

    this.promiseExample1.then(res => {
      // console.log(`Inside the then block and response is : ${res}`);
      this.popupValue = res;
    }).catch(err => {
      // console.log(`Inside the catch block and error is : ${err}`);
      this.popupValue = err;
    });
  }

}
