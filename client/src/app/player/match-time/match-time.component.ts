import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentService } from 'src/app/sharedServices/appointment.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match-time',
  templateUrl: './match-time.component.html',
  styleUrls: ['./match-time.component.css']
})
export class MatchTimeComponent implements OnInit {

  color;
  constructor(private appointmentService: AppointmentService, private activeRoute: ActivatedRoute, private userService: UserService) { }
  events: EventInput[] = []//= [{ title: 'Event 1', start: '2019-06-11 09:30', end: '2019-06-11 11:30' }]
  calendarPlugins = [timeGridPlugin, interactionPlugin]; // important!
  // selectable: true
  playgroundId;
  currentPlayer;

  get_appointments() {
    this.appointmentService.getAppointments(this.playgroundId).subscribe(
      res => {
        res.forEach(appointment => {
          console.log(appointment);
          let match = null;
          if (appointment.player._id == this.currentPlayer) {
            match = { title: "Your Match", start: appointment.startTime, end: appointment.endTime };
          }
          else {
            match = { title: appointment.player.name + "'s Match ", start: appointment.startTime, end: appointment.endTime };
          }
          this.events = this.events.concat(match);
        });
      },
      err => {
        console.log(err);
        this.appointmentService = err.message;
      }
    );
  }
  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      let endDate = new Date(arg.date);
      endDate.setTime(endDate.getTime() + .5 * 60 * 60 * 1000);
      let newMatch = {
        title: 'New Match',
        start: arg.date,
        end: endDate
      };
      console.log(newMatch);
      this.appointmentService.add(newMatch, this.playgroundId).subscribe(res => {
        this.events = this.events.concat(newMatch);
      }, err => {
        console.log(err.error);
        alert("Something went wrong " + '\n' + err.error[0]);
      });
    }
  }

  ngOnInit() {
    console.log(this.userService.getUserPayload());
    this.currentPlayer = this.userService.getUserPayload()._id;
    this.playgroundId = this.activeRoute.snapshot.params['id'];
    this.get_appointments();
  }

}
