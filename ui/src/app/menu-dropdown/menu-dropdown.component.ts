import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Server } from '../shared/models/server.interface';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent  {

  @Input() server: Server;
  @Output() serverSelected = new EventEmitter<any>();

  constructor() { }

  changeServerState(serverid: number, state: number) {
    this.serverSelected.emit([serverid, state]);
  }

}
