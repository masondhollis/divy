import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  posts = data.Posts;
  profile = Object.keys(data.Profiles).map(function(key){
    return data.Profiles[key];
  });
  myprofile;
  menu = false;
  view = "public";
  constructor(public navCtrl: NavController) {
    this.myprofile = this.profile[0];
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
