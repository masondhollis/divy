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
import { LoginPage} from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = LoginPage;
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

  getClass() {
      this.navCtrl.getActive.name;
  }

  getPage(){
  if(this.navCtrl.getActive() != null)
    {
    if(this.navCtrl.getActive().name == 'HomePage')
      return 'Ham';
    else if(this.navCtrl.getActive().name == 'ProfilePage')
      return 'Back';
    else return 'Ham';
    }
  }

  checkMain(){
  if(this.navCtrl.getActive() != null)
    {
    if(this.navCtrl.getActive().name == 'HomePage')
      return 'true';
    else if(this.navCtrl.getActive().name == 'ProfilePage')
      return 'true';
    else
      return 'false';
    }
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  styleHeader(){
    if(this.navCtrl.getActive() != null)
    {
    if(this.navCtrl.getActive().name == 'ProfilePage')
      return {'background-color':'rgba(255,255,255,0.6)','backdrop-filter': 'blur(4px)'};
    else
      return {'background-color':'rgba(255,255,255,1)'};
    }
  }

  styleNav(){
    if(this.navCtrl.getActive() != null)
    {
    if(this.navCtrl.getActive().name == 'HomePage')
      return {'top':'40px'};
    else
      return {'top':'0px','height':'100%'};
    }
  }

  headerFix(){
    if(this.navCtrl.getActive() != null)
    {
    if(this.navCtrl.getActive().name == 'ProfilePage')
      return {'width':'33.25%','position':'relative','right':'1.5%'};
    }
  }
}
