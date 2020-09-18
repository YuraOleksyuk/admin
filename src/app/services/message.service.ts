import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(private matSnackBar: MatSnackBar) {}

  showUserMessage(message: Message) {
    this.matSnackBar.open(message.text, 'Ok', {
      duration: 5000,
    });
  }

  showErrorMessage(error: any) {
    this.matSnackBar.open(error.status + ' - ' + error.error.text, 'Ok', {
      duration: 5000,
    });
  }
}
