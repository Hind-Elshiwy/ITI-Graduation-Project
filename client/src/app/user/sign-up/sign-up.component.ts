import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: NgForm) {
    this.userService.addUser(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        if (form.value.role === "player") this.router.navigateByUrl('/player/profile');
        else if (form.value.role === "owner") this.router.navigateByUrl('/owner/profile');
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.user = {
      role: 'player',
      name: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }


  ngOnInit() {
    this.userService.user = {
      role: 'player',
      name: '',
      email: '',
      password: ''
    };
  }

}
