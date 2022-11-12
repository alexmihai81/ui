import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AuthState } from './modules/shared/reducers/auth.reducer';
import { isLoggedIn } from './modules/shared/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedIn = false;

  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.store.select(isLoggedIn).subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    })
  }
}
