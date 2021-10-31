import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit, AfterViewInit {

  @ViewChild('enter') enter !: ElementRef;
  inputData: string;
  defaultListSel!: string;

  constructor() { 
    this.inputData = '';
  }

  ngOnInit(): void {
    this.defaultListSel = 'dot-net';
  }

  ngAfterViewInit(): void {
    fromEvent(this.enter.nativeElement, 'click').subscribe((res) => {
      // console.log(res);
      // console.log(this.defaultListSel);
      this.addData();
    });
  }

  addData():void {
    let element = document.createElement('li');
    element.setAttribute('class', 'list-group-item list-group-item-action');
    // console.log(element.classList);
    element.innerText = this.inputData;

    document.getElementById(this.defaultListSel)?.appendChild(element);
  }

}
