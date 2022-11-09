import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './modules/Chat/chat/chat.component';
import { ChatsComponent } from './modules/Chat/chats/chats.component';
import { LoginComponent } from './modules/Login/login/login.component';
import { MatchesComponent } from './modules/Matches/matches/matches.component';
import { MatchingComponent } from './modules/Matching/matching/matching.component';
import { ProfileComponent } from './modules/Profile/profile/profile.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'matching',
  component: MatchingComponent
}, {
  path: 'chat/:id',
  component: ChatComponent
}, {
  path: 'chats',
  component: ChatsComponent
}, {
  path: 'matches',
  component: MatchesComponent
}, {
  path: 'profile',
  component: ProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
