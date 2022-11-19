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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/shared/interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

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
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    NotifierModule.withConfig({
      position: {
        horizontal: { position: 'middle' },
        vertical: { position: 'top' },
      },
      behaviour: {
        autoHide: 1000
      }
    })
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [NotifierModule],
})
export class AppModule { }
