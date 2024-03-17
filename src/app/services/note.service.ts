import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private _HttpClient: HttpClient) {}

  header: any = { token: '3b8ny__' + localStorage.getItem('token') };

  addNote(data: object): Observable<any> {
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      data,
      { headers: this.header }
    );
  }
  updateNote(data: object, id: string): Observable<any> {
    return this._HttpClient.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      data,
      { headers: this.header }
    );
  }
  deleteNote(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      { headers: this.header }
    );
  }
  getNote(): Observable<any> {
    return this._HttpClient.get(
      `https://note-sigma-black.vercel.app/api/v1/notes/allNotes`,
      { headers: this.header }
    );
  }
  getUserNote(): Observable<any> {
    return this._HttpClient.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      { headers: this.header }
    );
  }
}
