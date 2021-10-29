import { Component, OnInit } from '@angular/core';
import { carValue } from '../config/car-values.config';
import { Car } from '../model/car.model';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {

  isResolved!: boolean;
  promiseExample1!: Promise<any>;
  popupValue!: boolean;
  carVal: Array<Car> = carValue;
  company: string = "";
  output!: any;
  isFirstTime!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isResolved = true;
    this.output = undefined;
    this.isFirstTime = true;
  }

  changeValue(inp: boolean): void {
    this.isResolved = inp;
  }

  definiteEvent(): void {
    console.log("This is a definite event");
  }

  promiseCalled1(): void {
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

  search(com: string): void {
    this.isFirstTime = false;
    // console.log(this.carVal.filter(res => res.maker.toLowerCase().includes(this.company) ));
    let promiseExample2 = new Promise((resolve, reject) => {
      let output = this.carVal.filter(val => { return val.maker.toLowerCase().includes(com.toLowerCase()) });

      if (output.length > 0) {
        return setTimeout(() => {
          resolve(output);
        }, 3000);
      }
      else {
        return setTimeout(() => {
          reject("Oops, no records found");
        }, 3000);
      }
    });

    promiseExample2.then(res => {
      this.output = res;
      console.log(this.output);
    })
      .catch(err => {
        this.output = undefined;
        console.log(err);
      });
  }
}
