import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})

export class convoPage {
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
