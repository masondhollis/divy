import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
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

  filt = "All";
  feed = "public";
  constructor(public navCtrl: NavController, public menuCtrl: MenuController)
  {
    // menuCtrl.enable(false, 'menu-one');
    menuCtrl.enable(true, 'hamMenu');
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  //TODO: IMPLEMENT PAGE Nav
  pushPage(id: string)
  {
    if(id === "profile")
      this.navCtrl.push(ProfilePage,{},{animate:false});
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

  Comment(post){
    //Open interface to take user input
  }

  Repost(post){
    //

  }

  Share(post){
    //Copy link to the post
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


}
