import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  private _url: string;
  photosData: any;
  dataObj: { max: number, min: number };

  subsHandler!: Subscription;
  fromSub!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://jsonplaceholder.typicode.com/photos';
    this.photosData = [];
    this.dataObj = { min: 0, max: 0 };
  }

  ngOnInit(): void {
    // this.shared.getData(this._url).subscribe(res => {
    //   console.log(res);
    // });
    // this.getPhotosFromAPI();
  }

  ngOnDestroy(): void {
    if (this.subsHandler !== undefined) { this.subsHandler.unsubscribe(); }
    if (this.fromSub !== undefined) { this.fromSub.unsubscribe(); }
  }

  getPhotosFromAPI(): void {
    this.subsHandler = this.shared.getData(this._url).subscribe(res => {
      // console.log(res);
      this.filterDataCustom(res);
    });
  }

  filterDataCustom(res: []): void {
    const data = from(res);
    this.fromSub = data.pipe(filter((value: any) => value.albumId >= this.dataObj.min && value.albumId <= this.dataObj.max), toArray())
      .subscribe(res => {
        // console.log(res);
        this.photosData = res;
      });
  }
}