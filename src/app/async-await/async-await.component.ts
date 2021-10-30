import { Component, OnInit } from '@angular/core';
import { carValue } from '../config/car-values.config';
import { Car } from '../model/car.model';

@Component({
  selector: 'app-async-await',
  templateUrl: './async-await.component.html',
  styleUrls: ['./async-await.component.scss']
})
export class AsyncAwaitComponent implements OnInit {

  carDetails: any = carValue;

  name!: string;
  age!: number;
  salary!: number;

  output1!: any;
  output2!: any;
  isResolved1!: boolean;
  isResolved2!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.output1 = "Get personalized list of cars, whose loan can be processed."
    this.output2 = "Get personalized list of cars, whose loan can be processed."
  }

  getLoanDetail1(): void {
    if (this.salary === 0 || this.salary === undefined || this.salary === null) {
      this.isResolved1 = false;
      this.output1 = "Get personalized list of cars, whose loan can be processed."
      return;
    }
    this.output1 = "Please wait while we get the details"

    let promise1 = new Promise((resolve, reject) => {
      let value = this.carDetails.filter((a: Car) => {
        // console.log((((a.price / 10) / 12) * 2));
        // console.log("Current salary is :", (this.salary/12))
        return this.salary / 12 >= (((a.price / 10) / 12) * 2);
      });

      value.length > 0 ? setTimeout(() => {
        resolve(value);
      }, 3000)
        : setTimeout(() => {
          reject("No cars available.");
        }, 3000);
    })

    promise1.then((res) => {
      console.log('Resolved!');
      this.isResolved1 = true;
      // this.output1 = JSON.stringify(res);
      this.output1 = res;
    })
      .catch((err) => {
        console.log('Rejected');
        this.isResolved1 = false;
        this.output1 = err;
      })
  }

  getLoanDetails2(): void {
    if (this.salary === 0 || this.salary === undefined || this.salary === null) {
      this.isResolved2 = false;
      this.output2 = "Get personalized list of cars, whose loan can be processed."
      return;
    }
    // this.output2 = "Please wait while we get the details"

    let promise2 = new Promise((resolve, reject) => {
      let value = this.carDetails.filter((a: Car) => {
        return this.salary / 12 >= (((a.price / 10) / 12) * 2);
      });

      if (value.length > 0) {
        this.isResolved2 = true;
        setTimeout(() => {
          resolve(value);
        }, 3000)
      }
      else {
        this.isResolved2 = false;
        setTimeout(() => {
          reject("No cars available.");
        }, 3000);
      }
    });

    this.asyncSearchMethod(promise2);
  }

  async asyncSearchMethod(m: Promise<any>): Promise<void> {

    try {
      this.output2 = await m;
    }
    catch (err) {
      this.output2 = err;
    }
  }
}

