import { identifierModuleUrl } from '@angular/compiler';
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

  appendElementUsingJS(eleName: string, className: string,
    id: string, message?: string): void {
    let element = document.createElement(eleName);
    element.setAttribute('class', className);

    if (message !== undefined) { element.innerText = message; }
    document.getElementById(id)?.appendChild(element);

  }
}
