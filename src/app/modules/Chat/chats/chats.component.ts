import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { authDetails } from '../../shared/selectors/auth.selector';
import { AnimalsService } from '../../shared/services/animals.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chatsInfo: any;
  profileId: number;
  constructor(private store: Store<AppState>, private animalsService: AnimalsService) { }

  ngOnInit(): void {
    this.store.select(authDetails).subscribe((authDetails) => {
      this.profileId = authDetails.profileId;
      if (this.profileId > 0) {
        this.animalsService.getChats(this.profileId).subscribe(response => {
          this.chatsInfo = response;
        })
      }
    })
  }

}
