import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Profile } from '../../shared/models/profile.model';
import { authDetails } from '../../shared/selectors/auth.selector';
import { AnimalsService } from '../../shared/services/animals.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: Profile[] = [];
  currentId: number;
  loading = false;

  constructor(private animalsService: AnimalsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(authDetails).subscribe(details => {
      if (details.profileId > 0) {
        this.loading = true;
        this.currentId = details.profileId;
        this.animalsService.getMatches(this.currentId).subscribe(response => {
          this.matches = response;
        }).add(() => this.loading = false)
      }
    }).add(() => this.loading = false)
  }

  remove(index: number) {
    this.matches.splice(index, 1);
  }

}
