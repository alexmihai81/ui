import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './modules/Chat/chat/chat.component';
import { ChatsComponent } from './modules/Chat/chats/chats.component';
import { LoginComponent } from './modules/Login/login/login.component';
import { MatchesComponent } from './modules/Matches/matches/matches.component';
import { MatchingComponent } from './modules/Matching/matching/matching.component';
import { CreateProfileComponent } from './modules/Profile/create-profile/create-profile.component';
import { ProfileComponent } from './modules/Profile/profile/profile.component';
import { IsLoggedInGuard } from './modules/shared/guards/is-logged-in.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'matching',
  component: MatchingComponent,
  canActivate: [IsLoggedInGuard]
}, {
  path: 'chat/:id',
  component: ChatComponent,
  canActivate: [IsLoggedInGuard]
}, {
  path: 'chats',
  component: ChatsComponent,
  canActivate: [IsLoggedInGuard]
}, {
  path: 'matches',
  component: MatchesComponent,
  canActivate: [IsLoggedInGuard]
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [IsLoggedInGuard]
}, {
  path: 'create-profile',
  component: CreateProfileComponent,
  canActivate: [IsLoggedInGuard]
}, {
  path: '**',
  redirectTo: '/matching',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
