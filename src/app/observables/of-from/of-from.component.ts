import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit {

  count: any;

  constructor(private shared: SharedService) {
    this.count = null;
  }

  ngOnInit(): void {
  }

  clickToAdd(trigger: string): void {
    let countArray = [];
    document.querySelectorAll(".spinner-border").forEach(el => el.remove());

    for (var i = 1; i <= this.count; i++) {
      countArray.push(i);
    }
    trigger === 'Of' ? this.subscribeUsingOf(countArray)
      : this.subscribeUsingFrom(countArray);
  }

  appendSpinner(): void {
    this.shared.appendElementUsingJS('div', 'spinner-border text-success ml-1',
      'spinner-container');
  }

  subscribeUsingOf(arr: any): void {
    console.log('Of');
    of(...arr).subscribe((res: any) => {
      // console.log(res);
      this.appendSpinner();
    }).unsubscribe();
  }

  subscribeUsingFrom(arr: any): void {
    console.log('From');
    from(arr).subscribe((res: any) => {
      // console.log(res);
      this.appendSpinner();
    }).unsubscribe();
  }
}

