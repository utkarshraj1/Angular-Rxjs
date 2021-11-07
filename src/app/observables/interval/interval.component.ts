import { Component, ElementRef, OnDestroy, OnInit, ValueProvider, ViewChild } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit {

  getQuote: any;
  quoteData: any;
  intervalSubscription!: Subscription;
  isDisabled!: boolean;
  // @ViewChild('subscribe') subscribe!: ElementRef;

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.isDisabled = false;
  }

  onSubscribe(operatorName: string): void {
    // alert("in Onsubscribe Method")
    // console.log(this.subscribe.nativeElement);
    this.isDisabled = true;
    this.quoteData = {
      content: "Declare variables not war!",
      author: "Unknown"
    };

    operatorName === 'Timer'
      ? document.getElementById('timerInfo')!.innerHTML = 'Timer will start after 10 sec with 5 sec interval afterwards.'
      : document.getElementById('timerInfo')!.innerHTML = 'Interval will start immediately with 5 sec interval.';

    operatorName === 'Interval' ? this.getQuote = interval(5000) : this.getQuote = timer(10000, 5000);
    // console.log('Subscription start!');
    this.intervalSubscription = this.getQuote.subscribe((res: any) => {
      // console.log(res);
      this.shared.fetchAPI('https://api.quotable.io/random').then(response => {
        // console.log(response);
        this.quoteData = response;
      });
      // console.log(this.quoteData);
    });
  }

  onUnsubscribe(): void {
    this.isDisabled = false;
    // console.log('Unsubscribed!');
    this.intervalSubscription.unsubscribe();
    this.quoteData = undefined;
    document.getElementById('timerInfo')!.innerHTML = '';
  }

  // ngOnDestroy() {
  //   this.intervalSubscription.unsubscribe();
  // }

}
