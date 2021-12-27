import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

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

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
