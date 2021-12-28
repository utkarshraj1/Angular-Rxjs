import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects/subjects.service';

@Component({
  selector: 'app-chunk-b',
  templateUrl: './chunk-b.component.html',
  styleUrls: ['./chunk-b.component.scss']
})
export class ChunkBComponent implements OnInit {

  latestTrivia: any;

  constructor(private sub: SubjectsService) { }

  ngOnInit(): void {
    this.sub.trivia.subscribe(res => {
      // console.log(res);
      this.latestTrivia = res;
    });

  }

  complete(): void {
    this.sub.trivia.complete();
  }

}
