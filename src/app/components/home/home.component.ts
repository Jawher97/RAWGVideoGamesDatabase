import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { APIResponse, Game } from 'src/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public sort : string
  public games : Array<Game>

  constructor(
    private router : Router,
    private httpService : HttpService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params : Params)=>{
      if (params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }
      else {
        this.searchGames('mecatric')
      }
    })
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]);
  }

  searchGames(sort : string, search? : string){
    this.httpService.getGameList(sort,search)
    .subscribe((gameList : APIResponse<Game>)=>{
      this.games=gameList.results
    })

  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }


}
