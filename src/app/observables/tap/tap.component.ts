import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit, OnDestroy {

  private _url: string;
  jokeData: any;

  jSubs!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10';
    this.jokeData = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.jSubs !== undefined) {
      console.log('Unsubscription!');
      this.jSubs.unsubscribe();
    }
  }

  getJoke(): void {
    // console.log('Joke Button Clicked!');
    this.jSubs = this.shared.getData(this._url)
      .pipe(tap(res =>
        console.log(`Total Jokes fetched: ${res.amount} and error came as << ${res.error} >> from the API`)))
      .subscribe((res) => {
        // console.log(res);
        this.jokeData = res.jokes;
        // console.log(this.jokeData);
      });
  }

}
