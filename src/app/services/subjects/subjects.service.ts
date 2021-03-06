import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  //#region Subject Component
  inputData: Subject<any> = new Subject<any>();
  loadStatus: BehaviorSubject<string> = new BehaviorSubject<string>('No Data request has been sent.');
  //#endregion

  //#region ReplaySubject Component
  quoteData: ReplaySubject<any> = new ReplaySubject(3);
  //#endregion

  //#region AsyncSubject Component
  trivia: AsyncSubject<any> = new AsyncSubject<any>();
  //#endregion

  constructor() { }
}
