import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})

export class membersPage {
  posts = data.Posts;
  constructor(public navCtrl: NavController) {

  }
}
