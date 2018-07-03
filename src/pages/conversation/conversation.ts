import { Component  } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})

export class convoPage {
  message = null;
  content = null;
  myprofile = null;
  profile = Object.keys(data.Profiles).map(function(key){
    return data.Profiles[key];
  });

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = data.Profiles[0].messages[navParams.get("ConKey")];
    this.content = this.message.content;
    this.myprofile = this.profile[0];
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  send()
  {
    if((<HTMLInputElement>document.getElementById('content')).value != "")
    {
    var stuff = (<HTMLInputElement>document.getElementById('content')).value;
    var newMessage = {text:stuff, user:"true", time:"now"};
    this.content.push(newMessage);
    (<HTMLInputElement>document.getElementById("content")).value = "";
    }
  }
}
