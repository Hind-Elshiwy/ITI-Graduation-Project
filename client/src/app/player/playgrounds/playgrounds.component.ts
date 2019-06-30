import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/sharedServices/playground.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.css']
})
export class PlaygroundsComponent implements OnInit {
  cities = ['All Cities'].concat(environment.cities) ;
  serverError;
  playgroundsList = [];
  showedPlaygrounds=[];
  selectedCity='All Cities';
  constructor(private playgroundService: PlaygroundService) { }

  list() {
    this.playgroundService.getAll().subscribe((list) => {
      this.playgroundsList = <any>list;
      this.showedPlaygrounds = <any>list;
    },
      err => {
        this.serverError = err;
      }
    );
  }

  update(){
    if (this.selectedCity=='All Cities'){this.showedPlaygrounds = this.playgroundsList;}
    else{
      this.showedPlaygrounds = this.playgroundsList.filter(playground=>{
        return playground.city == this.selectedCity ;
      });
    }
  }

  ngOnInit() {
    this.list();
  }

}
