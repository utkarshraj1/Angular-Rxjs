import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})
export class TakeComponent implements OnInit, OnDestroy {

  private _url: string;
  private _urlEnd: string;

  @ViewChild('stop') stopT!: ElementRef;

  inputVal1!: number;
  selectedChoice: boolean;

  intervalSub1!: Subscription;
  intervalSub2!: Subscription;
  intervalSub3!: Subscription;

  dataSub1!: Subscription;
  dataSub2!: Subscription;
  dataSub3!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'http://numbersapi.com/';
    this._urlEnd = '/math?json';
    this.selectedChoice = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.intervalSub1 !== undefined) {
      this.intervalSub1.unsubscribe();
    }
    if (this.intervalSub2 !== undefined) {
      this.intervalSub2.unsubscribe();
    }
    if (this.intervalSub3 !== undefined) {
      this.intervalSub3.unsubscribe();
    }

    if (this.dataSub1 !== undefined) {
      this.dataSub1.unsubscribe();
    }
    if (this.dataSub2 !== undefined) {
      this.dataSub2.unsubscribe();
    }
    if (this.dataSub3 !== undefined) {
      this.dataSub3.unsubscribe();
    }
  }

  getNumberTrivia(trigger: string): void {
    switch (trigger) {
      case 'take':
        const subInt = interval(1000);
        this.intervalSub1 = subInt.pipe(take(this.inputVal1)).subscribe(res => {
          const cUrl = this._url + res + this._urlEnd;
          // console.log(res);
          this.dataSub1 = this.shared.getData(cUrl).subscribe(trivia => {
            // console.log(trivia);
            this.shared.appendElementUsingJS('li', 'list-group-item list-group-item-action mt-2', 'take', trivia['text']);
          });
        });
        break;
      case 'takeWhile':
        const subInt2 = interval(2000);
        this.intervalSub2 = subInt2.pipe(takeWhile(val => this.selectedChoice)).subscribe(res => {
          // console.log(res);
          const cUrl2 = this._url + 'random' + this._urlEnd;
          this.dataSub2 = this.shared.getData(cUrl2).subscribe(trivia => {
            // console.log(trivia);
            this.shared.appendElementUsingJS('li', 'list-group-item list-group-item-action mt-2', 'takeWhile', trivia['text']);
          });
        });
        break;
      case 'takeUntil':
        const stopEvnt = fromEvent(this.stopT.nativeElement, 'click');
        const subInt3 = interval(2000);
        this.intervalSub3 = subInt3.pipe(takeUntil(stopEvnt)).subscribe(res => {
          // console.log(res);
          const cUrl1 = this._url + res + this._urlEnd;
          this.dataSub3 = this.shared.getData(cUrl1).subscribe(trivia => {
            this.shared.appendElementUsingJS('li', 'list-group-item list-group-item-action mt-2', 'takeUntil', trivia['text']);
          });
        });
        break;
    }
  }

}