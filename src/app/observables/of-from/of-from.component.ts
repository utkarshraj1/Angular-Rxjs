import { Component, OnInit } from '@angular/core';
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

  clickToAdd(): void {

    document.querySelectorAll(".spinner-border").forEach(el => el.remove());

    for (let i = 1; i <= this.count; i++) {
      this.appendSpinner();
    }
  }

  appendSpinner(): void {
    this.shared.appendElementUsingJS('div', 'spinner-border text-success ml-1',
      'spinner-container');
  }

}
