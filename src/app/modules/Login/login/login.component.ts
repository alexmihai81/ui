import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { LoginToken } from '../../shared/actions/auth.actions';
import { LoginRequest } from '../../shared/models/login-request.model';
import { LoginService } from '../../shared/services/login.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private store: Store<AppState>, private notifier: NotifierService) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get form() { return this.loginForm.controls }

  onSubmit() {
    if (!this.loginForm.invalid) {
      const request = new LoginRequest();
      request.username = this.form['username'].value;
      request.password = this.form['password'].value;
      this.loginService.login(request).subscribe((response) => {
        this.store.dispatch(new LoginToken({ token: response }));
      }, (error) => {
        let message;
        if (error.error) { message = error.error.message }
        else { message = error.message }
        this.notifier.notify('error', message);
      })
    }
  }
}
