import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesStreamService {

  private readonly countTotalSubject = new BehaviorSubject(null);
  readonly countTotalStream$ = this.countTotalSubject.asObservable();

  emitPanelCounter(countOfElements: number) {
    this.countTotalSubject.next(countOfElements);
  }
}
