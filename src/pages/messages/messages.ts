import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,ViewController} from 'ionic-angular';
var data = require("../../data/posts.json");

import {convoPage} from '../conversation/conversation';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})

export class messagesPage {
  gold ='false';
  messages = Object.keys(data.Profiles[0].messages).map(function(key){
    return data.Profiles[0].messages[key];
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.gold = navParams.get("Gold")
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  goConvo(key){
    this.navCtrl.push(convoPage,{ConKey: key},{animate:false})
  }

  goGold(message)
  {
    if(message.Gold == 'true')
      message.Gold = 'false';
    else
    {
      message.Gold = 'true';
      this.presentAlert(message);
    }

  }

  presentAlert(message) {
    let GoldModal = this.modalCtrl.create(GoldPage,{message:message},{
    cssClass: "Gold-modal"});
        GoldModal.present();
  }

  golden(){
    if(this.gold == 'false')
      return({"content": 'url(/assets/icon/likeB.png)'});
  }
}

@Component({selector: 'page-GoldPage',
template:`<ion-content (click) = 'dismiss()'>
  <div id="goldAlert">
  <div>
  <img/>
  <h4>{{message.name}}</h4>
  <h4>Was added to your Flamed Messages!</h4>
  </div>
  </div>
</ion-content>>`})

export class GoldPage {
  message={};
 constructor(public viewCtrl: ViewController, public navParams: NavParams) {
   this.message = navParams.get("message");
   setTimeout(() => {this.dismiss();}, 3000);
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }
}
