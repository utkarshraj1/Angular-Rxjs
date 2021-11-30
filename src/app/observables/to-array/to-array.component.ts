import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-to-array',
  templateUrl: './to-array.component.html',
  styleUrls: ['./to-array.component.scss']
})
export class ToArrayComponent implements OnInit {

  totalData: Array<number>;
  random: number;
  timerSubscribed!: Subscription;
  dataSubscribed!: Subscription;

  constructor() {
    this.totalData = [];
    this.random = 0;
  }

  ngOnInit(): void {
    this.unsubscriptionMethod();
  }

  getRandom(): void {
    this.unsubscriptionMethod();  //for checking the subscription
    this.random = Math.floor(Math.random() * 10) + 1;
    this.totalData = [];
    // console.log(this.random);
    let val = this.random;
    this.countdown(); //for countdown
    this.dataSubscribed = interval(1000).pipe(take(val), toArray()).subscribe((res) => {
      this.totalData = res;
      // console.log(this.totalData);
    });
  }

  countdown(): void {
    this.timerSubscribed = interval(1000).subscribe((res: number) => {
      this.random === 0 ? this.timerSubscribed.unsubscribe() : this.random -= 1;
    });
  }

  unsubscriptionMethod(): void {
    if (this.timerSubscribed !== undefined) {
      this.timerSubscribed.unsubscribe();
    }
    if (this.dataSubscribed !== undefined) {
      this.dataSubscribed.unsubscribe();
    }
  }

}