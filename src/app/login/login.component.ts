import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _UserService: UserService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}

  msgError: string = '';

  signInForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][0-9]{3,10}$/)],
    ],
  });

  getDataLogin(): void {
    this._UserService.signIn(this.signInForm.value).subscribe({
      next: (response) => {
        if (response.msg == 'done') {
          this._Router.navigate(['./home']);
          localStorage.setItem('token', response.token);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.msgError = err.error.msg;
      },
    });
  }
}
