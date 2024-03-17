import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  signUp(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
      userData
    );
  }
  signIn(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
      userData
    );
  }
  signOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['./login']);
  }
}
