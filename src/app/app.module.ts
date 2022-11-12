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
import { CreateProfileComponent } from './modules/Profile/create-profile/create-profile.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/shared/interceptors/auth.interceptor';

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
    HeaderComponent,
    CreateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
