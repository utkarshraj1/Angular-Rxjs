import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, from, of, Subscription } from 'rxjs';
import { concatAll, concatMap, delay, map, pluck, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss']
})
export class ConcatMapComponent implements OnInit, OnDestroy {

  private _url: string;
  isConcatMap!: boolean;

  jSub1!: Subscription;
  jSub2!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=10';
  }

  ngOnInit(): void {
    this.fetchData('CM');
  }

  ngOnDestroy(): void {
    if (this.jSub1 !== undefined) {
      this.jSub1.unsubscribe();
    }
    if (this.jSub2 !== undefined) {
      this.jSub2.unsubscribe();
    }
  }

  fetchData(input: string): void {

    switch (input) {
      case 'CM':
        if (this.jSub1 !== undefined) {
          this.jSub1.unsubscribe();
        }
        this.deletedChildNodes('card-1');
        this.jSub1 = this.shared.getData(this._url)
          .pipe(pluck('jokes'), map(arr => from(arr)))
          .subscribe(value => {
            value.pipe(concatMap(obs => { return of(obs).pipe(delay(2000)); }))
              .subscribe((res: any) => {
                // console.log(res);
                this.shared.appendElementUsingJS('div', 'card-body border mx-2 my-1', 'card-1', '=> ' + res.joke);
              });
          });
        this.isConcatMap = true;
        break;
      case 'MCA':
        if (this.jSub2 !== undefined) {
          this.jSub2.unsubscribe();
        }
        this.deletedChildNodes('card-2');
        this.jSub2 = this.shared.getData(this._url)
          .pipe(pluck('jokes'), map(arr => from(arr)))
          .subscribe(value => {
            value.pipe(map(obs => { return of(obs).pipe(delay(2000)); }), concatAll())
              .subscribe((res: any) => {
                // console.log(res);
                this.shared.appendElementUsingJS('div', 'card-body border mx-2 my-1', 'card-2', '=> ' + res.joke);
              });
          });
        this.isConcatMap = false;
        break;
    }
  }

  deletedChildNodes(id: string): void {
    const parent2 = document.getElementById(id);
    while (parent2?.firstChild) {
      parent2.removeChild(parent2.firstChild);
    }
  }
}
