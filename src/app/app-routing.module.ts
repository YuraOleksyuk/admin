import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { AuthComponent } from './components/auth/auth.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: NotesListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/new',
    component: NewNoteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/edit-note/:id',
    component: NewNoteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/login',
    component: AuthComponent
  },
  { path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
