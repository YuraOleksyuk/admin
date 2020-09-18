import {Component, OnInit} from '@angular/core';
import { User } from './interfaces/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  opened = false;

  constructor(public authService: AuthService) {}

  toggleSidenav() {
    this.opened = !this.opened;
  }

  ngOnInit() {
  }

  logOutUser() {
    this.authService.logoutUser();
  }

}
