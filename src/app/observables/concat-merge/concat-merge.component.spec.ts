import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatMergeComponent } from './concat-merge.component';

describe('ConcatMergeComponent', () => {
  let component: ConcatMergeComponent;
  let fixture: ComponentFixture<ConcatMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcatMergeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcatMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
