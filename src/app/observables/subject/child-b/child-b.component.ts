import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared/shared.service';
import { SubjectsService } from 'src/app/services/subjects/subjects.service';

@Component({
  selector: 'app-child-b',
  templateUrl: './child-b.component.html',
  styleUrls: ['./child-b.component.scss']
})
export class ChildBComponent implements OnInit, OnDestroy {

  private _url: string;
  productType!: Array<any>;
  pResSub!: Subscription;
  pSubjectSub!: Subscription;

  constructor(private sub: SubjectsService, private shared: SharedService) {
    this._url = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type=';
  }

  ngOnInit(): void {
    this.getProductsTypeJSON();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllSubs();
  }

  getProductsTypeJSON(): void {
    this.pSubjectSub = this.sub.inputData.subscribe(res => {
      // console.log("In child b: ", res);
      this.sub.loadStatus.next('Loading...');
      const cUrl = this._url + res;
      this.pResSub = this.shared.getData(cUrl).subscribe(
        (prod) => {
          // console.log(prod);
          this.productType = prod;
          this.sub.loadStatus.next('Loaded.');
        },
        (err) => {
          console.error(err);
          this.sub.loadStatus.next('Error encountered while fetching data.');
        });
    });
  }

  unsubscribeAllSubs(): void {
    if (this.pResSub !== undefined) {
      this.pResSub.unsubscribe();
    }
    if (this.pSubjectSub !== undefined) {
      this.pSubjectSub.unsubscribe();
    }
  }
}
