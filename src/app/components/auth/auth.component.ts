import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.loginUser(this.form.value)
        .subscribe((data: any) => {
          if (data.type === 'success') {
              this.authService.saveUser(data.token, data.user);
              this.router.navigate(['admin']);
          } else if (data.type === 'error') {
            this.messageService.showUserMessage(data);
          }
        });
    }
  }
}
