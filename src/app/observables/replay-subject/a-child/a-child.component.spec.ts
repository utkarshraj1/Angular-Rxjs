import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AChildComponent } from './a-child.component';

describe('AChildComponent', () => {
  let component: AChildComponent;
  let fixture: ComponentFixture<AChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
