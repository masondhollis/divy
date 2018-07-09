import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
var data = require("../../data/posts.json");

import {convoPage} from '../conversation/conversation';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})

export class messagesPage {
  gold ='false';
  messages = Object.keys(data.Profiles[0].messages).map(function(key){
    return data.Profiles[0].messages[key];
  });

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gold = navParams.get("Gold")
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  goConvo(key){
    this.navCtrl.push(convoPage,{ConKey: key},{animate:false})
  }

  goGold()
  {

  }
}
