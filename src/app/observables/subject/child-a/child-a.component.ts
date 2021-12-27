import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects/subjects.service';

@Component({
  selector: 'app-child-a',
  templateUrl: './child-a.component.html',
  styleUrls: ['./child-a.component.scss']
})
export class ChildAComponent implements OnInit {

  productType: string;
  productTypeData: Array<string> = [
    'Blush',
    'Bronzer',
    'Eyebrow',
    'Eyeliner',
    'Eyeshadow',
    'Foundation'
  ];
  loadingStatus!: string;

  constructor(private sub: SubjectsService) {
    this.productType = 'Select here';
  }

  ngOnInit(): void {
    this.sub.loadStatus.subscribe(res => {
      this.loadingStatus = res;
    });
  }

  getProduct(): void {
    // console.log(this.productType);
    this.sub.inputData.next(this.productType);
  }

}
