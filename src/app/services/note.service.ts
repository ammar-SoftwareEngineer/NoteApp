import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private _HttpClient: HttpClient) { }



  addNote(data: object): Observable<any> {
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      data,

    );
  }
  updateNote(data: object, id: string): Observable<any> {
    return this._HttpClient.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      data,
    );
  }
  deleteNote(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,

    );
  }
  getNote(): Observable<any> {
    return this._HttpClient.get(
      `https://note-sigma-black.vercel.app/api/v1/notes/allNotes`,

    );
  }
  getUserNote(): Observable<any> {
    return this._HttpClient.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,

    );
  }
}
