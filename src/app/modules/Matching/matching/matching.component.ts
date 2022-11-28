import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { VirtualTimeScheduler } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Profile } from '../../shared/models/profile.model';
import { authDetails, profileId } from '../../shared/selectors/auth.selector';
import { AnimalsService } from '../../shared/services/animals.service';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {

  @ViewChild('ref') ref: ElementRef;
  hide = false;
  id: number;
  displayProfile: Profile;
  loadMore = true;
  allProfiles: Profile[] = [];
  /* [
    {
      url: "https://placeimg.com/600/300/animals",
      name: "Name1",
      gender: "male",
      breedId: 1,
      speciesId: 1,
      birthday: "2022-11-11",
      selected: true,
      id: 1,
      userId: 1

    },
    {
      url: "https://placeimg.com/600/300/tech",
      name: "Name2",
      gender: "male",
      breedId: 1,
      speciesId: 1,
      birthday: "2022-11-11",
      selected: true,
      id: 2,
      userId: 2
    },
    {
      url: "https://placeimg.com/600/300/nature",
      name: "Name3",
      gender: "male",
      breedId: 1,
      speciesId: 1,
      birthday: "2022-11-11",
      selected: true,
      id: 3,
      userId: 3
    }, {
      url: "https://placeimg.com/600/300/people",
      name: "Name4",
      gender: "male",
      breedId: 1,
      speciesId: 1,
      birthday: "2022-11-11",
      selected: true,
      id: 4,
      userId: 4
    }
  ]; */

  constructor(private store: Store<AppState>, private animalsService: AnimalsService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.store.select(authDetails).subscribe((details) => {
      this.id = details.profileId;
      if (this.id > 0) {
        this.animalsService.getPossibleMatches(this.id).subscribe((response) => {
          if (response.length > 0) {
            this.allProfiles = response;
            this.displayProfile = this.allProfiles[0];
          }
          if (response.length < 10) {
            this.loadMore = false;
          }

        }, () => {
          this.notifier.notify('error', 'Error! Please contact administrator!');
        });
      }
    })
  }

  swipeCard(button: boolean): void {
    if (this.allProfiles.length == 0) return;
    var moveOutWidth = document.body.clientWidth * 1.5;
    this.animalsService.setLike(this.id, this.displayProfile.id, button).subscribe();
    if (button) {
      this.ref.nativeElement.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      this.ref.nativeElement.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    setTimeout(() => {
      this.hide = true;
      this.ref.nativeElement.style.transform = 'translate(0)';
      setTimeout(() => {
        this.allProfiles.splice(0, 1);
        this.displayProfile = this.allProfiles[0];
        this.hide = false
      }, 100)
    }, 150);
    if (this.allProfiles.length < 10 && this.loadMore) {
      this.animalsService.getPossibleMatches(this.id).subscribe((response: any) => {
        if (response.length > 0) {
          this.allProfiles = [...this.allProfiles, response];
        }
        if (response.length < 10) {
          this.loadMore = false;
        }
      })
    }
  }


}
