import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkAComponent } from './chunk-a.component';

describe('ChunkAComponent', () => {
  let component: ChunkAComponent;
  let fixture: ComponentFixture<ChunkAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChunkAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
