import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared/shared.service';
import { SubjectsService } from 'src/app/services/subjects/subjects.service';

@Component({
  selector: 'app-a-child',
  templateUrl: './a-child.component.html',
  styleUrls: ['./a-child.component.scss']
})
export class AChildComponent implements OnInit, OnDestroy {

  private _url: string = 'https://api.quotable.io/random';

  isSubscribed: boolean;
  quoteData: any;
  loadingStatus!: string;

  qSub!: Subscription;
  intSub!: Subscription;

  constructor(private sub: SubjectsService, private shared: SharedService) {
    this.isSubscribed = false;
    this.loadingStatus = 'Unsubscribed';
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.qSub !== undefined) {
      this.qSub.unsubscribe();
    }
    if (this.intSub !== undefined) {
      this.intSub.unsubscribe();
    }
  }

  btnTriggered(): void {
    if (!this.isSubscribed) {
      this.loadingStatus = 'Loading';
      const int = interval(5000);
      this.intSub = int.subscribe(res => {
        // console.log(res);
        this.qSub = this.shared.getData(this._url).subscribe(quote => {
          this.quoteData = quote;
          // console.log(quote);
          this.sub.quoteData.next(this.quoteData);
        });
      });
    }
    else {
      this.loadingStatus = 'Unsubscribed';
      if (this.intSub !== undefined) {
        // console.log('Unsubscribing!');
        this.intSub.unsubscribe();
      }
    }
    this.isSubscribed = !this.isSubscribed;
  }

}
