import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit {

  count: any;

  constructor() {
    this.count = null;
   }

  ngOnInit(): void {
  }

  clickToAdd(): void {

    document.querySelectorAll(".spinner-border").forEach(el => el.remove());

    for(let i = 1; i<=this.count; i++ ) {
      this.appendSpinner();
    }
  }

  appendSpinner(): void {
    let element = document.createElement('div');
    element.setAttribute('class','spinner-border text-success ml-1');
    document.getElementById('spinner-container')!.appendChild(element);
  }

}
