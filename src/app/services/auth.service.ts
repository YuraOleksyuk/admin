import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  token = '';

  constructor(private http: HttpClient, private router: Router) {
      this.getSavedUser();
  }

  public isAuthorized(): boolean {
    return this.user && !!this.user.id;
  }

  public getUser(): User {
    return this.user;
  }

  public getToken() {
    return this.token;
  }

  public getSavedUser() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    this.token = token ? token : '';
    this.user = user ? user : {};
  }

  public saveUser(token, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  public loginUser(loginPass) {
    return this.http.post(`${environment.apiServer}/api/users/login`, loginPass);
  }

  public logoutUser() {
    this.token = '';
    this.user = {
      id: '',
      name: '',
      email: ''
    };
    localStorage.setItem('token', '');
    localStorage.setItem('user', '{}');
    localStorage.clear();
    this.router.navigate(['admin/login']);
  }
}
