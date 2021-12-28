import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkBComponent } from './chunk-b.component';

describe('ChunkBComponent', () => {
  let component: ChunkBComponent;
  let fixture: ComponentFixture<ChunkBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChunkBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
