import { Playground } from './playground';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {

  myPlayground: Playground;
  constructor(private http: HttpClient) { }

  add(playground) {
    return this.http.post(environment.apiBaseUrl + '/playground', playground);
  };

  edit(playground, id) {
    return this.http.put(environment.apiBaseUrl + '/playground/' + id, playground);
  };

  delete(id) {
    return this.http.delete(environment.apiBaseUrl + '/playground/' + id);
  };

  getOwner() {
    return this.http.get(environment.apiBaseUrl + '/playground/owner');
  };

  getAll() {
    return this.http.get(environment.apiBaseUrl + '/playground');
  }

  details(id) {
    return this.http.get(environment.apiBaseUrl + '/playground/' + id);
  }

  // helper
  reset() {
    this.myPlayground = null;
  }

}
