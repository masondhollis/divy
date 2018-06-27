import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})

export class messagesPage {
  messages = Object.keys(data.Profiles[0].messages).map(function(key){
    return data.Profiles[0].messages[key];
  });

  constructor(public navCtrl: NavController) {
  }

  goBack()
  {
    this.navCtrl.pop();
  }
}
