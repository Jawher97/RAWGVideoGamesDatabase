import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { DevelopersSearchComponent } from './components/developers-search/developers-search.component';
import { GenreSearchComponent } from './components/genre-search/genre-search.component';
 
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path :'' , component : HomeComponent},
  {path : 'search/:game-search', component : HomeComponent},
  {path : 'details/:id', component : DetailsComponent},
  {
    path: 'genres',
    component: GenreSearchComponent
  },
  {
    path: 'genres/:game-genre',
    component : GenreSearchComponent
  },
  {
    path: 'developers',
    component : DevelopersSearchComponent
  },
  {
    path : 'developers/:game-developer',
    component : DevelopersSearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
