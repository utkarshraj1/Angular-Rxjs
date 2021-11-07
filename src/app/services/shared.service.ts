import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  fetchAPI(url: string): Promise<any> {
    return fetch(url)
      .then(res => res.json());
  }
}
