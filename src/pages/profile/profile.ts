import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  profile = Object.keys(data.Profiles).map(function(key){
    return data.Profiles[key];
  });

  myprofile;
  menu = false;
  view = "public";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myprofile = this.profile[navParams.get("ProKey")];
  }

  togglePro()
  {
    this.menu = !this.menu;
  }

  changeView(type: string)
  {
    this.view = type;
  }

  goBack()
  {
    this.navCtrl.pop();
  }
}
