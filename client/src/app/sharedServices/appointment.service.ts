import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAppointments(id) {
    return this.http.get<[Appointment]>(environment.apiBaseUrl + '/appointment/' + id);
  };

  add(appointment, id) {
    return this.http.post(environment.apiBaseUrl + '/appointment/' + id, appointment);
  }

  getPlayerMatches() {
    return this.http.get<[Appointment]>(environment.apiBaseUrl + '/appointment');
  }

  delete(id) {
    return this.http.delete(environment.apiBaseUrl + '/appointment/' + id);
  }

}
