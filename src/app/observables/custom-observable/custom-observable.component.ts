import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/model/car.model';
import { carValue } from 'src/app/config/car-values.config'
import { SharedService } from 'src/app/services/shared.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-observable',
  templateUrl: './custom-observable.component.html',
  styleUrls: ['./custom-observable.component.scss']
})
export class CustomObservableComponent implements OnInit {

  carData: Array<Car> = carValue;
  limit!: number;
  emittedCarData: Array<Car>;
  errorMessage: string;
  quote: any;

  subscription!: Subscription;
  qSubscription!: Subscription;

  constructor(private shared: SharedService) {
    this.emittedCarData = [];
    this.errorMessage = '';
    this.quote = null;
  }

  ngOnInit(): void {
  }

  customObservableMethod(cardLimit: number): Observable<Car> {
    return Observable.create((subscriber: any) => {
      this.carData.sort((a: Car, b: Car) => {
        return a.price > b.price ? 1 : -1;
      }).forEach((val) => {
        val.price > cardLimit ? subscriber.error('Sorry, but your credit limit exceeded!')
          : subscriber.next(val);
      });
      // subscriber.complete();
    });
  }

  limitCheck(): void {
    this.emittedCarData = [];
    this.errorMessage = '';
    if (this.limit === undefined) {
      this.errorMessage = 'Please enter a valid card limit.';
      return;
    }
    // let observableData = this.customInterval(this.limit);
    let observableData = this.customObservableMethod(this.limit);
    this.subscription = observableData.subscribe(
      (res) => {
        // console.log(res);
        this.emittedCarData.push(res);
      },
      (error) => {
        // console.log(error);
        this.errorMessage = error;
      },
    );
    // console.log(this.subscription);
    // this.subscription.unsubscribe();
  }

  customInterval(): Observable<any> {
    return Observable.create((subscriber: any) => {
      setInterval(() => {
        subscriber.next('5000 ms waited');
      }, 5000);
    });
  }

  unlimitedQuote(): void {
    this.quote = {
      content: "Declare variables not war!",
      author: "Unknown"
    };
    let qObservable = this.customInterval();
    this.qSubscription = qObservable.subscribe((res) => {
      // console.log(res);
      this.shared.getData('https://api.quotable.io/random').subscribe((res) => {
        this.quote = res;
        // console.log(this.quote);
      });
    });
  }

  unsubscribeQuote(): void {
    this.quote = null;
    this.qSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeQuote();
  }
}
