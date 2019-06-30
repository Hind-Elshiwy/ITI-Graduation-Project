import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/sharedServices/playground.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-playgrounds',
  templateUrl: './owner-playgrounds.component.html',
  styleUrls: ['./owner-playgrounds.component.css']
})
export class OwnerPlaygroundsComponent implements OnInit {

  serverError;
  PlaygroundsList = [];
  constructor(private playgroundService: PlaygroundService, private router: Router) { }

  list() {
    this.playgroundService.getOwner().subscribe((list) => {
      this.PlaygroundsList = <any>list;
    },
      err => {
        this.serverError = err;
      }

    );
  }

  delete(id) {
    this.playgroundService.delete(id).subscribe(data => {
      this.list();
    }, err => {
      this.serverError = err;
    })
  }

  edit(id) {
    this.router.navigateByUrl('/owner/editplayground/' + id);
  }

  reservations(id) {
    this.router.navigateByUrl('/owner/reservations/' + id);
  }

  ngOnInit() {
    this.list();
  }

}
