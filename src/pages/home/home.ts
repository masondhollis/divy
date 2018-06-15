import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
var data = require("../../data/posts.json");

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts = data.Posts;
  filt = "All";
  constructor(public navCtrl: NavController) {

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
}
