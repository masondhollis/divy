import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { IonicSwipeAllModule } from 'ionic-swipe-all';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage} from '../pages/profile/profile';
import { messagesPage} from '../pages/messages/messages';
import { settingsPage} from '../pages/settings/settings';
import { membersPage} from '../pages/members/members';
import {convoPage} from '../pages/conversation/conversation';
import {GoldPage} from '../pages/messages/messages';
import { buttonPage } from '../pages/home/home';
import { picPage } from '../pages/home/home';
import {editPage} from '../pages/profile/profile'
import { emberPage } from '../pages/home/home';
import { commentPage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CognitoServiceProvider } from '../providers/cognito-service/cognito-service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpPage} from '../pages/sign-up/sign-up';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    messagesPage,
    settingsPage,
    membersPage,
    convoPage,
    GoldPage,
    buttonPage,
    picPage,
    editPage,
    emberPage,
    commentPage,
    LoginPage,
    SignUpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
    //IonicSwipeAllModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    messagesPage,
    settingsPage,
    membersPage,
    convoPage,
    GoldPage,
    buttonPage,
    picPage,
    editPage,
    emberPage,
    commentPage,
    LoginPage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CognitoServiceProvider
  ]
})
export class AppModule {
}
