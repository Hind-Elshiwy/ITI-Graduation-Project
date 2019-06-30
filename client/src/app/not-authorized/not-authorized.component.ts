import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css']
})
export class NotAuthorizedComponent implements OnInit {

  constructor(private _location: Location, private userService: UserService, private router: Router) { }
  role;
  wantedRole;
  ngOnInit() {
    let payload = this.userService.getUserPayload();
    this.role = payload.role;
    this.wantedRole = this.role === "player" ? "owner" : "player";
  }
  onCreate() {
    this.userService.deleteToken();
    this.router.navigate(['/signup']);
  }
  onBack() {
    this._location.back();
  }
}
