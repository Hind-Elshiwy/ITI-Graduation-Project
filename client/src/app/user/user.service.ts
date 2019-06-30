import { environment } from './../../environments/environment';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    role: 'player',
    name: '',
    email: '',
    password: '',
    avatar: ''
  };
  noAuthHeader = { headers: new HttpHeaders({ "noauth": "true" }) };
  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/user/signup', user, this.noAuthHeader);
  }

  login(user) {
    return this.http.post(environment.apiBaseUrl + '/user/signin', user, this.noAuthHeader);
  }

  getUser() {
    return this.http.get(environment.apiBaseUrl + '/user');
  }

  editUser(user: any) {
    return this.http.put(environment.apiBaseUrl + '/user', user);
  }


  // helpers
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
