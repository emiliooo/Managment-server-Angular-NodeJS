import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server } from '../shared/models/server.interface';
import { interval, pipe, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { takeWhile } from 'rxjs/operators';
import { GetServersDataService } from '../shared/services/getServers/get-servers-data.service';
import { State } from '../shared/enums/stateServer';
import { ObservablesStreamService } from '../shared/services/observableService/observables.service';



@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  servers: Server[];
  userSearch = ' ';

  constructor(private getServersDataService: GetServersDataService,
              private observablesStreamService: ObservablesStreamService) { }

  ngOnInit() {
    this.dataList();
  }

  dataList() {
    this.getServersDataService.getListsServers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((listOfServers: Server[]) => {
        this.servers = listOfServers;
        this.observablesStreamService.emitPanelCounter(listOfServers.length);
      },
        error => console.error('Observer got an error: ' + error)
      );
  }

  displayValueQuery(query: string) {
    this.userSearch = query;
  }

  changeServerState(numberServer: number, stateServer: string) {
    let alive = true;
    this.getServersDataService.changeStateServer(numberServer, stateServer)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.changeStatusServerLocaly(numberServer, stateServer);
        if (stateServer === 'reboot') {
          interval(1000)
            .pipe(tap(() => this.dataList()))
            .pipe(takeWhile(() => alive))
            .subscribe(() => {
              this.getServersDataService.getDataServer(numberServer)
                .pipe(takeUntil(this.destroy$))
                .subscribe((server: Server) => {
                  if (server.status !== 'REBOOTING') {
                    alive = false;
                  }
                });
            },
              error => console.error('Observer got an error: ' + error)
            );
        }

      });
  }

  changeStatusServerLocaly(numberServer: number, stateServer: string) {
    switch (stateServer) {
      case State.on:
        stateServer = 'ONLINE';
        break;
      case State.off:
        stateServer = 'OFFLINE';
        break;
      case State.reboot:
        stateServer = 'REBOOTING';
        break;
    }

    this.servers.forEach(server => {
      if (server.id === numberServer) {
        server.status = stateServer;
      }
    });
  }

  execChangeServerState(serverSelected: object) {
    this.changeServerState(serverSelected[0], serverSelected[1]);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
