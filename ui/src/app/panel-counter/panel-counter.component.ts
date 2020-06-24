import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ObservablesStreamService } from '../shared/services/observableService/observables.service';

@Component({
  selector: 'app-panel-counter',
  templateUrl: './panel-counter.component.html',
  styleUrls: ['./panel-counter.component.scss']
})
export class ScoreElementsComponent implements OnInit, OnDestroy  {
  destroy$: Subject<boolean> = new Subject<boolean>();
  totalOfElements: number;

  constructor(private observablesStreamService: ObservablesStreamService) { }

  ngOnInit() {
    this.observablesStreamService.countTotalStream$
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
