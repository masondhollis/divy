import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  profile = Object.keys(data.Profiles).map(function(key){
    return data.Profiles[key];
  });

  posts = Object.keys(data.Posts).map(function(key){
    return data.Posts[key];
  });

  myprofile;
  menu = false;
  plus = false;
  view = "public";
  proPosts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.myprofile = this.profile[navParams.get("ProKey")];
    var x;
    for (x in this.myprofile.posts){
      this.proPosts.push(this.posts[this.myprofile.posts[x]]);
    }
  }

  togglePro()
  {
    this.menu = !this.menu;
  }

  changeView(type: string)
  {
    this.view = type;
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  rType()
  {
    return this.view;
  }

  plusTog()
  {
    this.plus = !this.plus;
  }

  edit()
  {
    let edit = this.modalCtrl.create(editPage,{
    cssClass: ""});
    edit.present();
  }
}

@Component({selector: 'page-edit',
templateUrl: 'profileSett.html'})

export class editPage {
 constructor(public viewCtrl: ViewController, public navParams: NavParams) {
 }

 goBack() {
   this.viewCtrl.dismiss();
 }
}
