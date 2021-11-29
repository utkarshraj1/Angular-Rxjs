import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit {

  count: any;
  strLen: number;
  value: string = '';
  allCategoryUrl: string = 'https://fakestoreapi.com/products/categories';

  constructor(private shared: SharedService) {
    this.count = null;
    this.strLen = 0;
  }

  ngOnInit(): void {
  }

  clickToAdd(trigger: string): void {
    let countArray = [];
    document.querySelectorAll(".spinner-border").forEach(el => el.remove());

    for (var i = 1; i <= this.count; i++) {
      countArray.push(i);
    }
    trigger === 'Of' ? this.subscribeUsingOf(countArray).subscribe((res: any) => { this.appendSpinner(); })
      : this.subscribeUsingFrom(countArray).subscribe((res: any) => { this.appendSpinner(); });
  }

  appendSpinner(): void {
    this.shared.appendElementUsingJS('div', 'spinner-border text-success ml-1',
      'spinner-container');
  }

  getAllCategories(): void {
    const promRes = this.shared.fetchAPI(this.allCategoryUrl);
    const subs = this.subscribeUsingFrom(promRes).subscribe((res: any) => {
      // console.log(res);
      document.querySelectorAll(".list-group-item").forEach(el => el.remove());
      res.forEach((val: string) => {
        this.shared.appendElementUsingJS('button', 'list-group-item list-group-item-action', 'list', val);
      });
    });
  }

  countStringLen(): void {
    this.strLen = 0;
    const subs1 = this.subscribeUsingFrom(this.value).subscribe((res: string) => {
      // console.log(res);
      this.strLen++;
    });
  }

  subscribeUsingOf(arr: any): Observable<any> {
    console.log('Of');
    return of(...arr);
  }

  subscribeUsingFrom(arr: any): Observable<any> {
    console.log('From');
    return from(arr);
  }
}

