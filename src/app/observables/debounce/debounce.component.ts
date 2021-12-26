import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IGender } from 'src/app/model/gender.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.scss']
})
export class DebounceComponent implements OnInit, OnDestroy, AfterViewInit {

  private _url: string;

  @ViewChild('input') input!: ElementRef;
  genderRes: IGender;
  loading: boolean;

  debounceSubs!: Subscription;
  genderSubs!: Subscription;

  constructor(private shared: SharedService) {
    this._url = 'https://api.genderize.io/?name=';
    this.loading = false;
    this.genderRes = {
      name: '',
      gender: '',
      probability: 0,
      count: 0
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.debounceSubs = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(map(val => val.target.value), debounceTime(1000), distinctUntilChanged())
      .subscribe(val => {
        // console.log(val);
        this.loading = true;
        const cUrl = this._url + val;
        setTimeout(() => {
          this.genderSubs = this.shared.getData(cUrl)
            .pipe(map((res) => {
              res.probability *= 100;
              return res;
            }))
            .subscribe(
              (res) => {
                // console.log(res);
                this.genderRes = res;
                this.loading = false;
              },
              (err) => {
                this.genderRes = {
                  name: '',
                  gender: '',
                  probability: 0,
                  count: 0
                };
                console.log('Bamm!!');
                this.loading = false;
              });
        }, 1000);
      });
  }

  ngOnDestroy(): void {
    if (this.debounceSubs !== undefined) {
      this.debounceSubs.unsubscribe();
    }
    if (this.genderSubs !== undefined) {
      this.genderSubs.unsubscribe();
    }
  }

}
