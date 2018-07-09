import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})

export class membersPage {
  filter="following";

  group=null;
  members={};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.group = navParams.get("Group");
    this.members = data.members[this.group];
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  changeFilter(change){
    this.filter = change;
  }

  style(type){
    if(this.filter == type)
      return {"border-bottom": "solid", "border-width":"thin"};
  }
}
