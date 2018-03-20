import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts = data.Posts;

  constructor(public navCtrl: NavController) {
  }

}
