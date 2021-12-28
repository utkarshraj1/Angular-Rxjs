import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared/shared.service';
import { SubjectsService } from 'src/app/services/subjects/subjects.service';

@Component({
  selector: 'app-chunk-a',
  templateUrl: './chunk-a.component.html',
  styleUrls: ['./chunk-a.component.scss']
})
export class ChunkAComponent implements OnInit {
  private _url: string;
  private _urlEnd: string;
  triviaData: Array<any>;

  triviaSub!: Subscription;

  constructor(private sub: SubjectsService, private shared: SharedService) {
    this._url = 'http://numbersapi.com/';
    this._urlEnd = '/math?json';
    this.triviaData = [];
  }

  ngOnInit(): void {
  }

  dispatchData(input: any): void {
    // console.log(input.value);
    let val = input.value;
    if (input.value === '' || input.value === undefined || input.value === null) {
      val = 'random';
    }
    const cUrl = this._url + val + this._urlEnd;
    this.triviaSub = this.shared.getData(cUrl).subscribe(res => {
      // console.log(res);
      this.triviaData.push(res);
      this.sub.trivia.next(res);
    });
  }

}
