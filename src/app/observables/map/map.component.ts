import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPerson } from 'src/app/shared-files/model/person.model';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  name: string;
  private _url: string;
  responseData: IPerson;

  subsValue!: Subscription;

  constructor(private shared: SharedService) {
    this.name = '';
    this._url = 'https://api.nationalize.io/?name=';
    this.responseData = {
      name: '',
      country: [
        { country_id: '', probability: 0 }
      ]
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subsValue !== undefined) { this.subsValue.unsubscribe(); }
  }

  search(): void {
    // console.log(this.name);
    this.responseData = {
      name: '',
      country: [
        { country_id: '', probability: 0 }
      ]
    };

    const customURL = this._url + this.name;
    this.subsValue = this.shared.getData(customURL).pipe(map(res => {
      // console.log(res);
      res.country.forEach((val: { country_id: string; probability: number; }) => {
        val.probability *= 100;
      });
      return res;
    })).subscribe((res) => {
      // console.log(res);
      this.responseData = res;
    });
  }
}
