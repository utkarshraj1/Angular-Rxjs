import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { IDoge } from 'src/app/shared-files/model/doge.model';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-pluck',
  templateUrl: './pluck.component.html',
  styleUrls: ['./pluck.component.scss']
})
export class PluckComponent implements OnInit, OnDestroy {

  private _url: string;
  memeData: IDoge[];
  memeCount!: number;

  getDataSub!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://api.doge-meme.lol/v1/memes/?skip=0&limit=';
    this.memeData = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.getDataSub !== undefined) {
      this.getDataSub.unsubscribe();
    }
  }

  searchMeme(): void {
    const customUrl = this._url + this.memeCount;
    this.getDataSub = this.shared.getData(customUrl).pipe(pluck('data')).subscribe(res => {
      // console.log(res);
      this.memeData = res;
    });
  }
}