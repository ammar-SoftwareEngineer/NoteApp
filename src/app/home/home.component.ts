import { Component, Inject, OnInit, inject } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
    private _UserService: UserService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }
  title: string = '';
  content: string = '';
  noteData: any;
  searchKey: string = '';
  noteId: any;
  noteIdDetails: any;
  data: any;
  dataDetails: any;
  closeModal: boolean = false

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
        this.noteForm.reset({
          title: '',
          content: ''
        });
        this.ngOnInit();
      },
    });

  }

  updateNoteData(noteId: string): void {
    this._NoteService.updateNote(this.noteForm.value, noteId).subscribe({
      next: (response) => {
        this.data = response.note;
        if (this.noteForm.value.title !== "" && this.noteForm.value.content !== "") {
        this.clearData()
        } else {
          this.noteForm.patchValue({
            title: this.data.title,
            content: this.data.content
          });
        }
        this.ngOnInit();
      },
    });
  }

  clearData():void{
    this.noteForm.reset({
      title: "",
      content: ""
    });
  }

  deleteNoteData(id: string) {
    this._NoteService.deleteNote(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
    });
  }
}
