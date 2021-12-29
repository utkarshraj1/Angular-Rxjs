import { Component, OnDestroy, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Subscription } from 'rxjs';
import { pluck, map, mergeAll, mergeMap } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit, OnDestroy {

  private _url: string;
  selectedOption!: string;

  jSub1!: Subscription;
  jSub2!: Subscription;
  jSub3!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=10';
    this.selectedOption = 'Map';
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  onOptionSelect(): void {
    this.deleteAllChild();
    switch (this.selectedOption) {
      case 'Map':
        this.jSub1 = this.shared.getData(this._url)
          .pipe(pluck('jokes'),
            map((res: any) => {
              return from(res);
            }))
          .subscribe(res => {
            res.subscribe((jRes: any) => {
              // console.log(joke);
              this.shared.appendElementUsingJS('div', 'card-body border mx-2 my-1', 'card', '=> ' + jRes.joke);
            });
          });
        break;
      case 'Map + MergeAll':
        this.jSub2 = this.shared.getData(this._url)
          .pipe(pluck('jokes'),
            map((res: any) => {
              return from(res);
            }), mergeAll())
          .subscribe((jRes: any) => {
            // console.log(res);
            this.shared.appendElementUsingJS('div', 'card-body border mx-2 my-1', 'card', '=> ' + jRes.joke);
          });
        break;
      case 'MergeMap':
        this.jSub3 = this.shared.getData(this._url)
          .pipe(pluck('jokes'), mergeMap(res => from(res)))
          .subscribe((jRes: any) => {
            // console.log(jRes.joke);
            this.shared.appendElementUsingJS('div', 'card-body border mx-2 my-1', 'card', '=> ' + jRes.joke);
          });
        break;
    }
  }

  unsubscribeAll(): void {
    if (this.jSub1 !== undefined) {
      this.jSub1.unsubscribe();
    }
    if (this.jSub2 !== undefined) {
      this.jSub2.unsubscribe();
    }
    if (this.jSub3 !== undefined) {
      this.jSub3.unsubscribe();
    }
  }

  deleteAllChild(): void {
    let parent = document.getElementById('card');
    while (parent?.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

}
