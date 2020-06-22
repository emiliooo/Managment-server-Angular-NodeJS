import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Server } from '../shared/models/server.interface';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent  {

  @Input() server: Server;
  @Output() serverDetail = new EventEmitter<any>();

  constructor() { }

  changeServerState(serverid: number, state: number) {
    this.serverDetail.emit([serverid, state]);
  }

}
