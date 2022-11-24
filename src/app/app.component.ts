import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { isLoggedIn } from './modules/shared/selectors/auth.selector';
import { LoginService } from './modules/shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedIn = false;

  constructor(private store: Store<AppState>, private loginService: LoginService) { }
  ngOnInit() {
    this.loginService.localLogin();
    this.store.select(isLoggedIn).subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    })
  }
}
