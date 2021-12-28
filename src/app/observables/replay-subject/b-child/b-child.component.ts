import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SubjectsService } from 'src/app/services/subjects/subjects.service';

@Component({
  selector: 'app-b-child',
  templateUrl: './b-child.component.html',
  styleUrls: ['./b-child.component.scss']
})
export class BChildComponent implements OnInit, OnDestroy {

  likedQuote: Array<any>;

  qSub!: Subscription;

  constructor(private sub: SubjectsService) {
    this.likedQuote = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  subscribeLikedQuote(): void {
    this.qSub = this.sub.quoteData.pipe(take(3)).subscribe(res => {
      this.likedQuote.push(res);
      // console.log(this.likedQuote);
    });
  }

  unsubscribeAll(): void {
    if (this.qSub !== undefined) {
      this.qSub.unsubscribe();
    }
  }

}
