import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  private readonly scoreTotalSubject = new BehaviorSubject(null);
  readonly scoreTotalStream$ = this.scoreTotalSubject.asObservable();

  emitScoreTotal(countOfElements: number) {
    this.scoreTotalSubject.next(countOfElements);
  }
}
