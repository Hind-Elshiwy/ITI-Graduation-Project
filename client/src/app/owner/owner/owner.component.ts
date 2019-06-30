import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  error;
  ngOnInit() {
    this.userService.getUser().subscribe(
      res => {
        this.userService.user = <any>res;
      },
      err => {
        this.error = err.message;
      }
    );

  }
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
