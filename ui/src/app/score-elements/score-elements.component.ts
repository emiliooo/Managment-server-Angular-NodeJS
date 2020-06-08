import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservablesService } from '../shared/services/observableService/observables-.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-score-elements',
  templateUrl: './score-elements.component.html',
  styleUrls: ['./score-elements.component.scss']
})
export class ScoreElementsComponent implements OnInit, OnDestroy  {
  destroy$: Subject<boolean> = new Subject<boolean>();
  totalOfElements: number;

  constructor(private observablesService: ObservablesService) { }

  ngOnInit() {
    this.observablesService.scoreTotalStream$
    .pipe(takeUntil(this.destroy$))
    .subscribe( (numberOfList: number) => {
      this.totalOfElements = numberOfList;
    },
    error => console.error('Observer got an error: ' + error)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
