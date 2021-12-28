import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, interval, merge, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-concat-merge',
  templateUrl: './concat-merge.component.html',
  styleUrls: ['./concat-merge.component.scss']
})
export class ConcatMergeComponent implements OnInit, OnDestroy {

  cSub!: Subscription;
  mSub!: Subscription;

  concatArr: Array<string>;
  mergeArr: Array<string>;
  concatMsg!: string;
  mergeMsg!: string;

  constructor() {
    this.concatArr = [];
    this.mergeArr = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAllSubs();
  }

  concatMethod(): void {
    if (this.cSub !== undefined) {
      this.cSub.unsubscribe();
    }
    this.concatArr = [];
    this.concatMsg = 'Concatenating...';

    const aInt = interval(3000).pipe(map(val => 'A : ' + (val + 1)), take(5));
    const bInt = interval(3500).pipe(map(val => 'B : ' + (val + 1)), take(7));
    const cInt = interval(4000).pipe(map(val => 'C : ' + (val + 1)), take(9));
    const con = concat(aInt, bInt, cInt);

    this.cSub = con.subscribe(res => {
      this.concatArr.push(res);
    });
  }

  mergeMethod(): void {
    if (this.mSub !== undefined) {
      this.mSub.unsubscribe();
    }
    this.mergeArr = [];
    this.mergeMsg = 'Merging...';

    const aInt = interval(3800).pipe(map(val => 'P : ' + (val + 1)), take(6));
    const bInt = interval(4500).pipe(map(val => 'Q : ' + (val + 1)), take(5));
    const cInt = interval(3000).pipe(map(val => 'R : ' + (val + 1)), take(7));
    const mer = merge(aInt, bInt, cInt);

    this.mSub = mer.subscribe(res => {
      this.mergeArr.push(res);
    });
  }

  unsubscribeAllSubs(): void {
    if (this.cSub !== undefined) {
      this.cSub.unsubscribe();
    }
    if (this.mSub !== undefined) {
      this.mSub.unsubscribe();
    }
  }

}
