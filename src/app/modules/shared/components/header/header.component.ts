import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Logout} from "../../actions/auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    localStorage.clear();
    this.store.dispatch(new Logout({token: '', userId: -1, profileId: -1}));
    this.router.navigate(['/login']);

  }
}
