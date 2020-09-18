import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesListService } from '../../services/notes-list.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../interfaces/note';
import { environment } from '../../../environments/environment';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {
  noteImg = '';
  noteForm: FormGroup;
  selectedThumb;
  selectedThumbPreview;
  editNoteId = '';
  editNote: Note;

  constructor(
    public notesListService: NotesListService,
    public messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.noteForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'url': new FormControl('', [
        Validators.required
      ]),
      'text': new FormControl('', []),
    });
  }

  ngOnInit() {
    this.editNoteId = this.route.snapshot.paramMap.get('id');
    if (this.editNoteId) {
      this.getNoteById(this.editNoteId);
    }
  }

  submitNoteform() {
    if (!this.noteForm.valid) {
      return;
    }
    if (!this.selectedThumb) this.selectedThumb = '';

    if (this.editNoteId) {
      this.notesListService.updateNote(this.editNoteId, this.noteForm.value, this.selectedThumb)
        .subscribe((data: Message) => {
          if (data.type === 'success') {
            this.messageService.showUserMessage(data);
          }
        }, (error) => {
          this.messageService.showErrorMessage(error);
        });
    } else {
      this.notesListService.createNote(this.noteForm.value, this.selectedThumb)
        .subscribe((data: Message) => {
          if (data.type === 'success') {
            this.messageService.showUserMessage(data);
          }
        }, (error) => {
          this.messageService.showErrorMessage(error);
        });
    }
  }

  changeNoteImg(event) {
    this.selectedThumb = (event.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();

    if (!this.selectedThumb) {
      return;
    }

    fileReader.readAsDataURL(this.selectedThumb);
    fileReader.onload = () => {
      this.selectedThumbPreview = fileReader.result;
    };
  }

  getNoteById(id) {
    this.notesListService.getNote(id)
      .subscribe((note: Note) => {
        this.editNote = note;
        this.updateFormcontrolValue(note);
      }, (err) => {
        this.messageService.showErrorMessage(err);
      });
  }

  updateFormcontrolValue(note: Note) {
    console.log(this.noteForm.controls);
    for (let control in this.noteForm.controls) {
      this.noteForm.controls[control].setValue(note[control]);
    }
    this.selectedThumb = note.thumb;
    this.selectedThumbPreview = environment.apiServer + note.thumb;
  }


}
