import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  posts = data.Posts;
  constructor(public navCtrl: NavController) {

  }

  //TODO: MAKE funciton to leave PAGE
  popPage()
  {
     this.navCtrl.pop({animate:false});
  }
}
