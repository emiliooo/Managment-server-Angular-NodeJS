import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Server } from '../../models/server.interface';


@Injectable({
  providedIn: 'root'
})
export class GetServersDataService {

  constructor(private http: HttpClient) { }

  getListsServers(): Observable<Server[]> {
    return this.http.get<Server[]>(environment.serverApi);
  }

  getDataServer(nrServer?: number): Observable<Server> {
    return this.http.get<Server>(environment.serverApi + `/${nrServer}`);
  }

  changeStateServer(nrServer: number, stateServer: string): Observable<Server> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Server>(environment.serverApi + `/${nrServer}/${stateServer}`, { headers });
  }


}
