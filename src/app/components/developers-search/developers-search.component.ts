import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';

import { environment } from 'src/environments/environment';
import { APIResponse, Game } from 'src/models';

@Component({
  selector: 'app-developers-search',
  templateUrl: './developers-search.component.html',
  styleUrls: ['./developers-search.component.css']
})
export class DevelopersSearchComponent implements OnInit {
  

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http : HttpClient
  ) { }

  public sort: string;
  
  public games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;
  

  

    //provides access to information about a route associated with a component that is loaded in an outlet.
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-developer']) {
        this.searchGames('ordering', params['game-developer']);
      }
      else{
        this.searchGames('ordering')
      }
    });
  }

  genres(){
    this.router.navigate(['genres'])
  }

  home(){
    this.router.navigate([''])
  }

  developers(){
    this.router.navigate(['developers'])
  }

  getGameListG(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering).set('page_size', '30').set('page','1');

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('developers', search).set('page_size', '30');
    }

    return this.http.get<APIResponse<Game>>(`${environment.url}/games`, {
      params: params,
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub =this.getGameListG(sort,search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['developers', form.value.search]);
  }


}
