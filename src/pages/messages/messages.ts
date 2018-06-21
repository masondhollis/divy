import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})

export class messagesPage {
  posts = data.Posts;
  constructor(public navCtrl: NavController) {

  }
}
