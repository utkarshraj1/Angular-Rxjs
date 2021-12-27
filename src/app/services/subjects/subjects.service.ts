import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  inputData: Subject<any> = new Subject<any>();
  loadStatus: BehaviorSubject<string> = new BehaviorSubject<string>('No Data request has been sent.');

  constructor() { }
}
