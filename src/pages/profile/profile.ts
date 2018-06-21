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
    return data.Profiles[0];
  });
  constructor(public navCtrl: NavController) {

  }
  
}
