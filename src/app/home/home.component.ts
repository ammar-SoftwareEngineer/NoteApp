import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _NoteService: NoteService,
    private _FormBuilder: FormBuilder,
    private _UserService: UserService
  ) {}

  title: string = '';
  content: string = '';
  noteData: any = '';
  searchKey: string = '';
  noteId: string = '';
  data: any = '';

  logOut(): void {
    this._UserService.signOut();
  }
  noteForm: FormGroup = this._FormBuilder.group({
    title: [''],
    content: [''],
  });

  ngOnInit(): void {
    this._NoteService.getUserNote().subscribe({
      next: (response) => {
        if (response.msg == 'done') {
          this.noteData = response.notes;
        }
      },
    });
  }
  addNoteData(): void {
    this._NoteService.addNote(this.noteForm.value).subscribe({
      next: (response) => {
        this.title = response.note.title;
        this.content = response.note.content;

        this.ngOnInit();
      },
    });
  }

  getNoteId(id: string): void {
    this.noteId = id;
  }

  updateNoteData(): void {
    this._NoteService.updateNote(this.noteForm.value, this.noteId).subscribe({
      next: (response) => {
        this.data = response.note;

        this.ngOnInit();
      },
    });
  }

  deleteNoteData(id: string) {
    this._NoteService.deleteNote(id).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit();
      },
    });
  }
}
