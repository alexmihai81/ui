import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './modules/Chat/chat/chat.component';
import { ChatsComponent } from './modules/Chat/chats/chats.component';
import { ChatsItemComponent } from './modules/Chat/chats-item/chats-item.component';
import { MatchesComponent } from './modules/Matches/matches/matches.component';
import { MatchesItemComponent } from './modules/Matches/matches-item/matches-item.component';
import { MatchingComponent } from './modules/Matching/matching/matching.component';
import { ProfileComponent } from './modules/Profile/profile/profile.component';
import { LoginComponent } from './modules/Login/login/login.component';
import { HeaderComponent } from './modules/shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatsComponent,
    ChatsItemComponent,
    MatchesComponent,
    MatchesItemComponent,
    MatchingComponent,
    ProfileComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
