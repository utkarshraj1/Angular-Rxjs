import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { pluck, retry } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss']
})
export class RetryComponent implements OnInit, OnDestroy {

  private _url: string;
  jsonRes1: any;
  loading1: boolean;
  message1: string;

  getSubscription!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10';
    this.loading1 = false;
    this.message1 = '';
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.getSubscription !== undefined) {
      this.getSubscription.unsubscribe();
    }
  }

  getCoffeeWithRetry(): void {
    this.loading1 = true;
    this.message1 = 'Loading...!';
    this.getSubscription = this.shared.getData(this._url).pipe(pluck('jokes'), retry(5))
      .subscribe(
        (res) => {
          console.log(res);
          this.jsonRes1 = res;
          this.loading1 = false;
          this.message1 = 'Loaded.'
        },
        (err) => {
          console.log('Uh, oh -> Error occured', err);
          this.loading1 = false;
          this.message1 = 'Facing issue while loading...'
        });
  }

}
