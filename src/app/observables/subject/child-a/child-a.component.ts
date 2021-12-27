import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectsService } from 'src/app/services/subjects/subjects.service';

@Component({
  selector: 'app-child-a',
  templateUrl: './child-a.component.html',
  styleUrls: ['./child-a.component.scss']
})
export class ChildAComponent implements OnInit, OnDestroy {

  productTypeData: Array<string> = [
    'Blush',
    'Bronzer',
    'Eyebrow',
    'Eyeliner',
    'Eyeshadow',
    'Foundation'
  ];
  productType!: string;
  loadingStatus!: string;
  lSubjectSub!: Subscription;

  constructor(private sub: SubjectsService) { }

  ngOnInit(): void {
    this.lSubjectSub = this.sub.loadStatus.subscribe(res => {
      this.loadingStatus = res;
    });
  }

  ngOnDestroy(): void {
    if (this.lSubjectSub !== undefined) {
      this.lSubjectSub.unsubscribe();
    }
  }

  getProduct(): void {
    // console.log(this.productType);
    this.sub.inputData.next(this.productType);
  }

}
