import { Component, OnInit } from '@angular/core';
import { NotesListService } from '../../services/notes-list.service';
import { Note } from '../../interfaces/note';
import { Message } from '../../interfaces/message';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[];
  staticUrl = environment.apiServer;

  constructor(
    private notesListService: NotesListService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesListService.getNotes()
      .subscribe((notes: Note[]) => {
        this.notes = notes;
      });
  }

  deleteNote(note: Note) {
    const deleteNote = confirm('Видалити нотвтку');
    if (deleteNote) {
      this.notesListService.deleteNote(note.id)
        .subscribe((message: Message) => {
          this.notes.splice(this.notes.indexOf(note), 1);
          this.messageService.showUserMessage(message);
        }, (err) => {
          this.messageService.showErrorMessage(err);
        });

    }
  }

}
