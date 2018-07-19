import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController } from 'ionic-angular';

import { emberPage } from '../home/home';
import { commentPage } from '../home/home';
import { buttonPage } from '../home/home';
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
  following = false;
  favorites = false;
  family = false;
  swipe = false;
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
    this.swipe = true;
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

  goLike(key,post){
    let buttonsPage = this.modalCtrl.create(buttonPage,{type:key,post:post},{
    cssClass: "button-modal"});
    buttonsPage.present();
  }

  Comment(post){
    let comPage = this.modalCtrl.create(commentPage,{post:post},{
    cssClass: "button-modal"});
    comPage.present();
  }

  Like(post){
  //Either like or unlike
  if(post.likes.Hit == "false")
  {
    post.likes.Hit = "true";
    post.likes.Amount =  String (parseInt(post.likes.Amount)+ 1);
    var newLike = {name:this.myprofile.name,username:this.myprofile.username,
    prof_pic: this.myprofile.prof_pic, id:"0"};
    post.likes.people.push(newLike);
  }
  else
  {
    post.likes.Hit = "false";
    post.likes.Amount =  String (parseInt(post.likes.Amount)- 1);
    post.likes.people.pop();
  }

  //Parse the data for Display
  let likes = post.likes.Amount;
  if(post.likes.Amount > 999999)
      post.likes.Display = String(parseInt(likes)).substring(0,2) + "m";
  else if(post.likes.Amount > 999)
      post.likes.Display = String(parseInt(likes)).substring(0,2) + "k";
  else
    post.likes.Display = String(parseInt(likes));
}

ember(post){
  let embPage = this.modalCtrl.create(emberPage,{post:post},{
  cssClass: "ember-modal"});
  embPage.present();
}

  toggle(type){
    if(type == 'follow')
      this.following = !this.following;
    else if(type == 'favorites')
      this.favorites = !this.favorites;
    else if(type == 'family')
      this.family = !this.family;
  }

  styleButton(){
    if((this.view == 'public' && this.following == true) || (this.view == 'friends'
      && this.favorites == true) || (this.view == 'family' && this.family == true))
        return{'color':'white'};
  }

  stylebutt(post,type)
  {
    if(post.likes.Hit =='true' && type == 'like')
      return{"content": 'url(/assets/icon/like.png)'}
    else if(post.embers.hit == 'true' && type == 'ember')
      return{"content": 'url(/assets/icon/emberxl.png)'}
  }

  styleText(post,type){
    if(type == 'like' && post.likes.Hit == 'true')
      return{"color": '#AA0000'}
    else if(post.embers.hit == 'true' && type == 'ember')
      return{"color": '#1BEADD'}
  }

  tfilter(key){
    if(this.view == key)
      return {"color":'black'};
  }

  pfilter(key){
    if(this.view == key)
      return{"content": 'url(/assets/icon/'+key+'B.png)'}
  }

  swipeToggle(key){
    if(this.menu == false)
      this.swipe = key;
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
