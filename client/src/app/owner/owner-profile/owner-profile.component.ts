import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {
  cities = environment.cities;

  constructor(private userService: UserService, private router: Router) { }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = /^(01)[0125][0-9]{8}$/;
  userDetails:User;
  serverError;
  showSucessMessage = false;
  image;
  uneditable = true;
  ngOnInit() {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = <User>res;
        console.log(this.userDetails);
      },
      err => {
        this.serverError = err.message;
      }
    );
  }
  onEdit() {
    this.uneditable = false;
  }

  processFile(imageInput) {
    this.image = imageInput.files[0];
  }

  onSubmit(form: NgForm) {
    form.value.avatar = this.image;
    const fd = new FormData();
    Object.entries(form.value).forEach(
      ([key, value]: any[]) => {
        if (value) {
          fd.set(key, value);
        } 
      });
    this.userService.editUser(fd).subscribe(
      res => {
        this.userDetails = <User>res;
        this.userService.user = <any>Object.assign({}, res);
        this.uneditable = true;
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);

      },
      err => {
        if (err.status === 422) {
          this.serverError = err.error.join('<br/>');
        }
        else
          this.serverError = 'Something went wrong.Please contact admin.';
      }
    );

  }

}
