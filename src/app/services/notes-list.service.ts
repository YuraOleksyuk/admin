import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../interfaces/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class NotesListService {
  private siteUrl = environment.apiServer;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.siteUrl + '/api/notes');
  }

  createNote(note: Note, thumb) {
    const formData = new FormData();
    for (const key in note) {
      formData.append(key, note[key]);
    }
    formData.append('noteThumb', thumb);

    return this.http.post(this.siteUrl + '/api/notes', formData);
  }

  updateNote(id, note: Note, thumb) {
    const formData = new FormData();
    for (const key in note) {
      formData.append(key, note[key]);
    }
    formData.append('noteThumb', thumb);

    return this.http.post(this.siteUrl + '/api/notes/' + id, formData);
  }

  deleteNote(id: string) {
    return this.http.delete(this.siteUrl + '/api/notes/' + id);
  }

  getNote(id: string) {
    return this.http.get(this.siteUrl + '/api/notes/' + id);
  }

}
