import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreElementsComponent } from './panel-counter.component';

describe('ScoreElementsComponent', () => {
  let component: ScoreElementsComponent;
  let fixture: ComponentFixture<ScoreElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
