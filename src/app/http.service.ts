import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  getGameList(
    ordering : string,
    search? : string
  ) : Observable<APIResponse<Game>>
  {
    let params = new HttpParams().set('ordering', ordering)

    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }

    return this.http.get<APIResponse<Game>>(`${environment.url}/games`,{
      params:params

  })
}

getGameDetails(id: string): Observable<Game> {
  const gameInfoRequest = this.http.get(`${environment.url}/games/${id}`);
  
  return forkJoin({
    gameInfoRequest
  }).pipe(
    map((resp: any) => {
      return {
        ...resp['gameInfoRequest']
      };
    })
  );
}
}
