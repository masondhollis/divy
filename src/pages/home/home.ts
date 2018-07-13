import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts = Object.keys(data.Posts).map(function(key){
    return data.Posts[key];
  });

  profile= data.Profiles[0];

  button = false;
  filt = "All";
  feed = "public";
  constructor(public navCtrl: NavController, public menuCtrl: MenuController,public modalCtrl: ModalController )
  {
    // menuCtrl.enable(false, 'menu-one');
    menuCtrl.enable(true, 'hamMenu');
  }

  //TODO: IMPLEMENT PAGE Nav
  pushPage(id: string)
  {
    if(id === "profile")
      this.navCtrl.push(ProfilePage,{ProKey: 0},{animate:false});
  }

  // TODO: FILTER POSTS BY SELECTED NAV BAR SECTION
  filter(type: string){
    this.filt = type;
  }

  rType(){
    return this.filt;
  }

  // TODO: Implement action button functions
  Like(post){
    //Either like or unlike
    if(post.likes.Hit == "false")
    {
      post.likes.Hit = "true";
      post.likes.Amount =  String (parseInt(post.likes.Amount)+ 1);
    }
    else
    {
      post.likes.Hit = "false";
      post.likes.Amount =  String (parseInt(post.likes.Amount)- 1);
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
    let buttonsPage = this.modalCtrl.create(buttonPage,{type:'emberA',post:post},{
    cssClass: "Gold-modal"});
    buttonsPage.present();
  }

  //TODO: IMPLEMENT LOGIC FOR FOOTER BUTTONS
  setfeed(type: string)
  {
    this.feed = type;
  }

  fType()
  {
    return this.feed;
  }

  goProfile(key){
    this.navCtrl.push(ProfilePage,{ProKey: key},{animate:false})
  }

  postB(){
    if((<HTMLInputElement>document.getElementById('htextbox')).value != "")
    {
      this.button = true;
    }
    else
      this.button = false;
  }

  createPost(){
    var stuff = (<HTMLInputElement>document.getElementById('htextbox')).value;
    var newPost = {name:this.profile.name,username:this.profile.username,time:"now",
    profile:"0",text:stuff,type:"Post", feed:this.feed,
    prof_pic:this.profile.prof_pic, post_pic:"",likes:{Amount:"0",Display:"0",Hit:"false"},
    comments:"0", embers:{display:'0',amount:'0',hit:'false'}};
    this.posts.push(newPost);
    (<HTMLInputElement>document.getElementById("htextbox")).value = "";
    this.button=false;
    }

    goLike(key,post){
      let buttonsPage = this.modalCtrl.create(buttonPage,{type:key,post:post},{
      cssClass: "Gold-modal"});
      buttonsPage.present();
    }

    goPic(key){
      let pictPage = this.modalCtrl.create(picPage,{type:key},{
      cssClass: "Gold-modal"});
      pictPage.present();
    }

    style(type){
      if(this.filt == type)
        return {"border-bottom": "solid", "border-width":"thin", "color":'black'};
    }
  }



  @Component({selector: 'page-buttonPage',
  template:`<ion-content (click) = 'dismiss()'>
    <h1>{{post.name}}</h1>
  </ion-content>>`})

  export class buttonPage {
    post={};
    type= null;
   constructor(public viewCtrl: ViewController, public navParams: NavParams) {
     this.type = navParams.get("type");
     this.post = navParams.get("post");
   }

   dismiss() {
     this.viewCtrl.dismiss();
   }
  }



  @Component({selector: 'page-picPage',
  template:`<ion-content (click) = 'dismiss()'>
    <h1>{{type}}</h1>
  </ion-content>>`})

  export class picPage {
    type={};
   constructor(public viewCtrl: ViewController, public navParams: NavParams) {
     this.type = navParams.get("type");
   }

   dismiss() {
     this.viewCtrl.dismiss();
   }
  }
