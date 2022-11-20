import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { LoginToken } from '../../shared/actions/auth.actions';
import { LoginRequest } from '../../shared/models/login-request.model';
import { LoginService } from '../../shared/services/login.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { isLoggedIn } from '../../shared/selectors/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private store: Store<AppState>, private notifier: NotifierService, private router: Router) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.store.select(isLoggedIn).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['matching'])
      }
    })
  }

  get form() { return this.loginForm.controls }

  onSubmit() {
    if (!this.loginForm.invalid) {
      const request = new LoginRequest();
      request.username = this.form['username'].value;
      request.password = this.form['password'].value;
      this.loginService.login(request).subscribe((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        this.store.dispatch(new LoginToken({ token: response.token, userId: response.userId }));
        this.router.navigate(['matching']);

      }, (error) => {
        let message;
        if (error.error.message) { message = error.error.message }
        else { message = error.error }
        this.notifier.notify('error', message);
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
