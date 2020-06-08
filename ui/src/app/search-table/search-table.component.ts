import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent  {
  @Output() valueChange = new EventEmitter();

  constructor() { }

  onKey(event) {
    this.valueChange.emit(event.target.value);
  }


}
