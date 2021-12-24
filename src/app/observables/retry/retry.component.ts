import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, pluck, retry, retryWhen, scan } from 'rxjs/operators';
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

  jsonRes2: any;
  loading2: boolean;
  message2: string;

  getSubscription!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10';
    this.loading1 = false;
    this.message1 = '';
    this.loading2 = false;
    this.message2 = '';
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy method called!');
    this.unsubscribeAllSubs();
  }

  getJokeWithRetry(): void {
    this.unsubscribeAllSubs();
    this.loading1 = true;
    this.jsonRes1 = [];
    this.message1 = 'Loading...!';
    this.getSubscription = this.shared.getData(this._url).pipe(pluck('jokes'), retry(5))
      .subscribe(
        (res) => {
          // console.log(res);
          this.jsonRes1 = res;
          this.loading1 = false;
          this.message1 = 'Loaded.';
        },
        (err) => {
          console.log('Uh, oh ->', err);
          this.loading1 = false;
          this.message1 = 'Facing issue while loading...';
        }
      );
  }

  getJokeWithRetryWhen(): void {
    // console.log('In RetryWhen method!');
    this.unsubscribeAllSubs();
    this.loading2 = true;
    this.jsonRes2 = [];
    this.message2 = 'Loading...!';
    this.getSubscription = this.shared.getData(this._url)
      .pipe(retryWhen((notif) => notif.pipe(delay(5000),
        scan((acc) => {
          if (acc > 5) {
            throw notif;
          }
          else {
            acc++;
            this.message2 = `Retrying...#${acc}`;
            return acc;
          }
        }, 0))))
      .subscribe(
        (res) => {
          // console.log(res);
          this.jsonRes2 = res.jokes;
          this.loading2 = false;
          this.message2 = 'Loaded.'
        },
        (err) => {
          console.log(err);
          this.loading2 = false;
          this.message2 = 'Failed to load the data.'
        }
      );
  }

  unsubscribeAllSubs(): void {
    if (this.getSubscription !== undefined) {
      // console.log('Unsubscription!');
      this.getSubscription.unsubscribe();
    }
  }

}
