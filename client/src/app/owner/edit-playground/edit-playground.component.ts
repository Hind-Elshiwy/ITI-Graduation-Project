import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/sharedServices/playground.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Playground } from 'src/app/sharedServices/playground';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-playground',
  templateUrl: './edit-playground.component.html',
  styleUrls: ['./edit-playground.component.css']
})
export class EditPlaygroundComponent implements OnInit {

  constructor(private playgroundService: PlaygroundService, private router: Router, private activeRoute: ActivatedRoute) { }

  image;
  newPlayground: Playground = {
    name: '',
    mainImg: '',
    city: '',
    address: '',
    price: null
  };
  serverError;
  id;
  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.playgroundService.details(this.id).subscribe(result => {
      this.newPlayground = <any>result;
    })
  }

  processFile(imageInput) {
    this.image = imageInput.files[0];
  }

  onSubmit(form: NgForm) {
    console.log(form);
    form.value.mainImg = this.image;
    const fd = new FormData();
    Object.entries(form.value).forEach(
      ([key, value]: any[]) => {
        if (value) {
          fd.set(key, value);
        }
      });

    this.playgroundService.edit(fd, this.id).subscribe(
      res => {
        this.router.navigateByUrl('/owner/playground');
      },
      err => {
        if (err.status === 422) {
          console.log(err);
          this.serverError = err.error;
        }
        else
          this.serverError = 'Something went wrong.Please contact admin.';
      }
    );
  }
}
