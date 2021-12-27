import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  inputData: Subject<any> = new Subject<any>();
  loadStatus: Subject<string> = new Subject<string>();

  constructor() { }
}
