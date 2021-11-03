import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit {

  getQuote: any;
  quoteData: any;
  subscriptionHandling!: Subscription;
  isDisabled!: boolean;
  // @ViewChild('subscribe') subscribe!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.isDisabled = false;
  }

  onSubscribe() {
    // alert("in Onsubscribe Method")
    // console.log(this.subscribe.nativeElement);
    this.isDisabled = true;
    this.quoteData = {
      content: "Declare variables not war!",
      author: "Unknown"
    };

    this.getQuote = interval(5000);
    // console.log('Subscription start!');
    this.subscriptionHandling = this.getQuote.subscribe((res: any) => {
      // console.log(res);
      fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(response => {
          // console.log(response);
          this.quoteData = response;
        });
      // console.log(this.quoteData);
    });
  }

  onUnsubscribe() {
    this.isDisabled = false;
    // console.log('Unsubscribed!');
    this.subscriptionHandling.unsubscribe();
    this.quoteData = undefined;
  }

}
