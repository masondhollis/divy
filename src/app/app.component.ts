import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Nav} from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ProfilePage} from '../pages/profile/profile';
import { messagesPage} from '../pages/messages/messages';
import { settingsPage} from '../pages/settings/settings';
import { membersPage} from '../pages/members/members';
import {convoPage} from '../pages/conversation/conversation';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;
  ProPage:any = ProfilePage;
  MePage:any = messagesPage;
  @ViewChild(Nav) navCtrl: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goHome()
  {
    this.navCtrl.goToRoot({animate:false});
  }

  goProfile(key)
  {
    this.navCtrl.push(ProfilePage,{ProKey: key});
  }

  goMessages(gold)
  {
    this.navCtrl.push(messagesPage,{Gold:gold},{animate:false});
  }

  goSettings()
  {
    this.navCtrl.push(settingsPage,{},{animate:false});
  }

  goMembers(group)
  {
    this.navCtrl.push(membersPage,{Group: group},{animate:false});
  }

}
