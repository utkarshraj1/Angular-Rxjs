import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit, AfterViewInit {

  @ViewChild('enter') enter !: ElementRef;
  inputData: string;
  defaultListSel!: string;

  constructor(private shared: SharedService) {
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

  addData(): void {
    this.shared.appendElementUsingJS('li', 'list-group-item list-group-item-action',
      this.defaultListSel, this.inputData);
  }

}
