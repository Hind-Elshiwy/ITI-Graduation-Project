import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/sharedServices/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as $ِِAB from "jquery";
import * as bootstrap from "bootstrap";
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private activeRoute: ActivatedRoute) { }
  events: EventInput[] = [];
  calendarPlugins = [timeGridPlugin, interactionPlugin]; // important!
  playgroundId;
  player;
  reservation_id;
  get_appointments() {
    this.appointmentService.getAppointments(this.playgroundId).subscribe(
      res => {
        res.forEach(appointment => {
          let match = { player: appointment.player, rservation: appointment._id, title: appointment.player.name, start: appointment.startTime, end: appointment.endTime };
          this.events = this.events.concat(match);
        });
        // console.log(this.events);
      },
      err => {
        console.log(err);
        this.appointmentService = err.message;
      }
    );
  }

  delete(id) {
    this.appointmentService.delete(id).subscribe(data => {
      this.events = this.events.filter((appointment) => {
        return appointment.rservation != id;
      });
      $('#playerModal').modal('hide');
    }, err => {
      console.log(err);
    })
  }

  handleEventClick(eventClickInfo) {
    console.log(eventClickInfo.event._def.extendedProps);
    this.player = eventClickInfo.event._def.extendedProps.player;
    this.reservation_id = eventClickInfo.event._def.extendedProps.rservation;
    $('#playerModal').modal('show');
  }
  ngOnInit() {
    this.playgroundId = this.activeRoute.snapshot.params['id'];
    this.get_appointments();
  }

}
