import { environment } from 'src/environments/environment';
import { PlaygroundService } from './../../sharedServices/playground.service';
import { Playground } from './../../sharedServices/playground';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-playground',
  templateUrl: './new-playground.component.html',
  styleUrls: ['./new-playground.component.css']
})
export class NewPlaygroundComponent implements OnInit {

  cities = environment.cities;
  image;
  newPlayground: Playground = {
    name: '',
    mainImg: '',
    city: 'Cairo',
    address: '',
    price: null
  };
  serverError;

  constructor(private playgroundService: PlaygroundService, private router: Router) { }

  ngOnInit() {

  }

  processFile(imageInput) {
    this.image = imageInput.files[0];
  }

  onSubmit(form: NgForm) {
    form.value.mainImg = this.image;
    const fd = new FormData();
    Object.entries(form.value).forEach(
      ([key, value]: any[]) => {
        if (value) {
          fd.set(key, value);
        }
      });
    console.log(fd);
    this.playgroundService.add(fd).subscribe(
      res => {
        this.router.navigateByUrl('/owner/playground');
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
