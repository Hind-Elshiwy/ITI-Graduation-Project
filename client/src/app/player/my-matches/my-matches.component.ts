import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/sharedServices/appointment.service';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.css']
})
export class MyMatchesComponent implements OnInit {

  constructor(private appointmentService: AppointmentService) { }
  Error;
  oldMatches = [];
  newMatches = [];
  // nowMatches = [];
  new = true;

  oldClicked() { this.new = false };
  newClicked() { this.new = true };

  delete(id) {
    this.appointmentService.delete(id).subscribe(data => {
      this.newMatches = this.newMatches.filter((match) => {
        return match._id != id;
      });
    }, err => {
      this.Error = err;
    })
  }

  ngOnInit() {
    this.appointmentService.getPlayerMatches().subscribe(
      res => {
        console.log(res);
        res.forEach(match => {
          if (new Date(match.endTime) < new Date()) {
            this.oldMatches.push(match);
          }
          else if (new Date(match.startTime) < new Date()) {
            this.oldMatches.push(match);
          }
          else if (new Date(match.startTime) > new Date()) {
            this.newMatches.push(match);
          }
        })
      },
      err => {
        this.Error = err;
        console.log(err);
      }
    );
  }

}
