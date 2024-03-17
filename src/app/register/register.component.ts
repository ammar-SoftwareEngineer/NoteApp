import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _UserService: UserService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}

  msgError: string = '';

  signUpForm: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][0-9]{3,10}$/)],
    ],
    age: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });

  getDataSign(): void {
    if (this.signUpForm.valid) {
      this._UserService.signUp(this.signUpForm.value).subscribe({
        next: (response) => {
          if (response.msg == 'done') {
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.msg;
          console.log(this.msgError);
        },
      });
    }
  }
}
