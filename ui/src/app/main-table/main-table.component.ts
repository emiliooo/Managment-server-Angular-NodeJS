import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server } from '../shared/models/server.interface';
import { interval, pipe, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { takeWhile } from 'rxjs/operators';
import { GetServersDataService } from '../shared/services/getServers/get-servers-data.service';
import { ObservablesService } from '../shared/services/observableService/observables-.service';


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
              private observablesService: ObservablesService) { }

  ngOnInit() {
    this.loadListsServers();
  }

  loadListsServers() {
    this.getServersDataService.getListsServers()
    .pipe(takeUntil(this.destroy$))
    .subscribe( (listOfServers: Server[])  => {
     this.servers = listOfServers;
     this.observablesService.emitScoreTotal(listOfServers.length);
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
        this.loadListsServers();
        if (stateServer === 'reboot') {
             interval(1000)
            .pipe(tap(() => this.loadListsServers()))
            .pipe(takeWhile(() => alive))
            .subscribe(() => {
              this.loadListsServers();
              this.getServersDataService.getDataServer(numberServer)
              .pipe(takeUntil(this.destroy$))
              .subscribe( (server: Server) => {
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
