import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DomSanitizer } from '@angular/platform-browser';
var data = require("../../data/posts.json");


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Post Objects
  posts = Object.keys(data.Posts).map(function(key){
    return data.Posts[key];
  });

  //User Profile
  profile= data.Profiles[0];
  button = false;
  filt = "All";
  feed = "public";

  //Main constructor
  constructor(public navCtrl: NavController, public menuCtrl: MenuController,
    public modalCtrl: ModalController, public sanitizer: DomSanitizer){
      menuCtrl.enable(true, 'hamMenu');
  }

  //Changing pages function
  pushPage(id: string){
    if(id === "profile")
      this.navCtrl.push(ProfilePage,{ProKey: 0},{animate:false});
  }

  //Setting Filter based on input
  filter(type: string){
    this.filt = type;
  }

  //Taking user input to set the feed
  setfeed(type: string){
    this.feed = type;
  }

  //Go to other user profile
  goProfile(key){
    this.navCtrl.push(ProfilePage,{ProKey: key},{animate:false})
  }

  //Liking a post
  Like(post){
  //Either like or unlike
    if(post.likes.Hit == "false")
    {
      post.likes.Hit = "true";
      post.likes.Amount =  String (parseInt(post.likes.Amount)+ 1);
      var newLike = {name:this.profile.name,username:this.profile.username,
        prof_pic: this.profile.prof_pic, id:"0"};
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

  //Embering a post
  ember(post){
    let embPage = this.modalCtrl.create(emberPage,{post:post},{
    cssClass: "ember-modal"});
    embPage.present();
  }

  //Commenting a post
  Comment(post){
    let comPage = this.modalCtrl.create(commentPage,{post:post},{
    cssClass: "button-modal"});
    comPage.present();
  }

  //Input function to check value to show other button
  postB(){
    if((<HTMLInputElement>document.getElementById('htextbox')).value != "")
    {
      this.button = true;
    }
    else
      this.button = false;
  }

  //Function for new temporary posts
  createPost(){
    var stuff = (<HTMLInputElement>document.getElementById('htextbox')).value;
    var newPost = {name:this.profile.name,username:this.profile.username,
      time:"now",profile:"0",text:stuff,type:"Post", feed:this.feed,
      prof_pic:this.profile.prof_pic, post_pic:"",likes:{Amount:"0",
      Display:"0",Hit:"false"},comments:"0",
      embers:{display:'0',amount:'0',hit:'false'}};

    this.posts.push(newPost);
    (<HTMLInputElement>document.getElementById("htextbox")).value = "";
    this.button=false;
  }

  //Go like or ember modal page when clicking on text
  goLike(key,post){
    let buttonsPage = this.modalCtrl.create(buttonPage,{type:key,post:post},{
    cssClass: "button-modal"});
    buttonsPage.present();
  }

  //Plus menu page on post input bar
  goPic(key){
    let pictPage = this.modalCtrl.create(picPage,{type:key},{
    cssClass: "select-modal"});
    pictPage.present();
  }

//CSS Dynamic styling functions
  style(type){
    if(this.filt == type)
      return {"border-bottom": "solid", "border-width":"thin", "color":'black'};
  }

  tfilter(key){
    if(this.feed == key)
      return {"color":'black'};
  }

  pfilter(key){
    if(this.feed == key)
      return{"content": 'url(/assets/icon/'+key+'B.png)'}
  }

  stylebutt(post,type){
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
}


//Page for showing user profiles who like or comment on a post
@Component({selector: 'page-buttonPage',
template:`
<ion-content class="notify">
  <ion-header id='likeH' no-border>
    <span *ngIf="type=='like'">
      <h4>{{post.likes.Display}} Likes</h4>
      <img id='post-like'/>
    </span>
    <span *ngIf = "type == 'ember'">
      <h4 [ngStyle]="{'color':'#1BEADD'}">{{post.embers.display}} Embers</h4>
      <img id='post-ember'/>
    </span>
  <img id='post-close' (click) = 'dismiss()'/>
  </ion-header>

  <ion-content class='feed'>
    <span *ngIf="type == 'like'">
      <span *ngFor="let member of post.likes.people">
        <ion-card class="people">
          <div id = "likeUser" (click)="goProfile(member.profile)">
            <img class="mprof_pic" src="{{member.prof_pic}}" />
            <div id = "MInfo">
              <h2 id = "mname">{{member.name}}</h2>
              <h2 id = "mUname">@{{member.username}}</h2>
            </div>
          </div>
        </ion-card>
      </span>
    </span>

    <span *ngIf="type == 'ember'">
      <span *ngFor="let member of post.embers.people">
        <ion-card class="people">
        <div id = "likeUser" (click)="goProfile(member.profile)">
          <img class="mprof_pic" src="{{member.prof_pic}}" />
            <div id = "MInfo" >
              <h2 id = "mname">{{member.name}}</h2>
              <h2 id = "mUname">@{{member.username}}</h2>
            </div>
        </div>
        </ion-card>
      </span>
    </span>
  </ion-content>
</ion-content>>`})

export class buttonPage {

  //variables
  post;
  type= null;

  //constructor
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
    this.type = navParams.get("type");
    this.post = navParams.get("post");
  }

  dismiss() {
     this.viewCtrl.dismiss();
  }

  goProfile(key){
    this.navCtrl.push(ProfilePage,{ProKey: key},{animate:false})
  }
}


//Page to open when hitting plus by post
@Component({selector: 'page-picPage',
template:`
<ion-content>
  <span *ngIf="this.type === 'main'">
    <div id='padding'></div>
      <div id='Picbar'>
        <img id='Pic-close' (click)= 'dismiss()' />
      <div>
        <h1> Add Photo </h1>
        <img id='Pic-pic'/>
      </div>
      <div>
        <h1> Add Video </h1>
        <img id='Pic-video'/>
      </div>
      <div (click)= 'gotime()'>
        <h1> Adjust Time </h1>
        <img id='Pic-time'/>
      </div>
    </div>
  </span>

  <span *ngIf="this.type === 'time'">
    <div id='Timebar'>
      <div id='padding'></div>
        <img id='time-close' (click)= 'goBack()' />
      <div>
        <h1> Adjust Time </h1>
        <img id='time-time'/>
      </div>
      <div id = 'slider'>
        <div>
          <h3>1 hour</h3>
          <h2>Unlimited</h2>
        </div>
        <input type='range' class='tSlider'/>
        <h1>4 hours</h1>
      </div>
      <div id='tFilt'>
        <h1 [ngStyle] = "{'border-bottom':'solid'}">Hours</h1>
        <h1>Days</h1>
        <h1>Weeks</h1>
      </div>
      <h2> Adjust Time for your post to be visible.</h2>
      <h1 (click)="goBack()">Done</h1>
    </div>
  </span>
  </ion-content>>`})

export class picPage {
  //variables
  type={};
  //constructor
  constructor(public modalCtrl: ModalController,public viewCtrl: ViewController, public navParams: NavParams) {
     this.type = navParams.get("type");
  }

   dismiss() {
     this.viewCtrl.dismiss();
   }

   //for moving to time
   gotime(){
     this.type='time';
   }



   //to go back to main
   goBack(){
     this.type='main';
   }
  }

//Ember alert page for Embering something
@Component({selector: 'page-emberPage',
template:`
<ion-content >
  <div id="embAlert">
    <div>
      <img id="button-ember"/>
      <h4>Are you sure you want to ember {{post.name}}'s {{post.type}}?</h4>
    </div>
    <div id ="YN">
      <h4 (click) = 'dismiss(1)'>Yes</h4><h4 (click) = 'dismiss(0)'>No</h4>
    </div>
  </div>
</ion-content>>`})
export class emberPage {

  //variables
  post;
  profile;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.post = navParams.get("post");
    this.profile= data.Profiles[0];
  }

  dismiss(ember) {
    if(ember == 1 && this.post.embers.hit === 'false')
    {
      this.post.embers.display = String (parseInt(this.post.embers.display)+ 1);
      this.post.embers.hit = 'true';
      var newEmber = {name:this.profile.name,username:this.profile.username,
      prof_pic: this.profile.prof_pic, id:"0"};
      this.post.embers.people.push(newEmber);
    }
     this.viewCtrl.dismiss();
  }
}


//Modal Page for the comment Page
@Component({selector: 'page-commentPage',
template:`
<ion-content class="notify">
  <ion-header id='likeH' no-border>
    <h3 [ngStyle]="{'color':'#000000'}">Comments</h3>
    <img id='post-commentB' (click)="setFeed(this.content)"/>
    <img id='post-close' (click) = 'dismiss()'/>
  </ion-header>

  <ion-content class='feed'>
  <span *ngFor="let member of post.comments.list">
    <ion-card class="people">
    <div id = "likeUser">
      <img id="cprof_pic" src="{{member.prof_pic}}" />
      <div id = "CInfo" (click)="goProfile(member.profile)">
        <h2>{{member.name}}</h2>
      </div>
      <div id='commentT'>
        <h2>{{member.text}}</h2>
      </div>
      <div id="ctime">
        <h4> {{member.time}}</h4>
        <h4 (click)="setFeed(member.replies)"> Reply </h4>
      </div>
    </div>
    </ion-card>

    <span *ngFor="let reply of member.replies">
    <ion-card class="people" >
      <div id = "reUser">
        <img id="reprof_pic" src="{{reply.prof_pic}}" />
        <div id = "CInfo" (click)="goProfile(reply.profile)">
          <h1>{{reply.name}}</h1>
        </div>
        <div id='commentT'>
          <h2>{{reply.text}}</h2>
        </div>
        <div id="rtime">
          <h3> {{reply.time}}</h3>
        </div>
      </div>
    </ion-card>
    </span>
  </span>
  </ion-content>

  <ion-footer *ngIf="comment == true" id="cfooter" no-border>
  <div id="cbar">
    <input id='com' placeholder='Comment...'/>
    <div (click) = 'send()'>SEND</div>
  </div>
  </ion-footer>
  </ion-content>>`})
export class commentPage {

    //variables
    post;
    content;
    currentfeed;
    comment = false;
    profile= data.Profiles[0];

    //constructor
   constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
     this.post = navParams.get("post");
     this.content= this.post.comments.list;
   }

   dismiss(ember) {
     if(ember == 1 && this.post.embers.hit === 'false')
     {
      this.post.embers.display = String (parseInt(this.post.embers.display)+ 1);
      this.post.embers.hit = 'true';
    }
     this.viewCtrl.dismiss();
   }

   //Post comment/reply
   send(){
     if((<HTMLInputElement>document.getElementById('com')).value != "")
     {
     var stuff = (<HTMLInputElement>document.getElementById('com')).value;
     var newComment = {text:stuff, name:this.profile.name,
       username:this.profile.username,prof_pic: this.profile.prof_pic, time:"now"};
       this.currentfeed.push(newComment);

     (<HTMLInputElement>document.getElementById("com")).value = "";
     this.comment = false;
     this.post.comments.display = String (parseInt(this.post.comments.display)+ 1);
     }
   }

   goProfile(key){
     this.navCtrl.push(ProfilePage,{ProKey: key},{animate:false})
   }

   setFeed(object){
     this.comment = true;
     this.currentfeed=object;
   }
}
