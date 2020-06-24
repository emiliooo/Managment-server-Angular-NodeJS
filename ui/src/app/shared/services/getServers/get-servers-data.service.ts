import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Server } from '../../models/server.interface';
const localEndPoint  = 'http://localhost:4454/servers';

@Injectable({
  providedIn: 'root'
})
export class GetServersDataService {

  constructor(private http: HttpClient) { }

  getListsServers(): Observable<Server[]> {
    return this.http.get<Server[]>(localEndPoint);
  }

  getDataServer(nrServer?: number): Observable<Server> {
    return this.http.get<Server>(localEndPoint + `/${nrServer}`);
  }

  changeStateServer(nrServer: number, stateServer: string): Observable<Server> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Server>(localEndPoint + `/${nrServer}/${stateServer}`, { headers });
  }


}
