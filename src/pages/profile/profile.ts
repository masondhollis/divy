import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController, Loading, LoadingController, Config } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
import {GatewayServiceProvider} from '../../providers/gateway-services';
import { emberPage } from '../home/home';
import { commentPage } from '../home/home';
import { buttonPage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';

var data;
var posts;
var profile;
var myprofile;

interface ProfileDDB {
  output: [{}];
  image: [{}];
}

@Component({
  selector: 'ProfilePage',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  
  setData = async() => {
    
    data = await this.setProfile();
    
    profile = await Object.keys(data).map(function(key){ return data[key];});

    myprofile = profile[0];
    
   //console.log(await profile[this.navParams.get("id")]);

  }

  goHome()
  {
    this.navCtrl.goToRoot({animate:false});
  }


  // //Posts definition
  // posts = Object.keys(data.Posts).map(function(key){
  //   return data.Posts[key];
  // });

  //Variables
  
  menu = false;
  plus = false; 
  following = false;
  favorites = false;
  family = false;
  swipe = true;
  view = "public";
  proPosts = [];
  test;
  profileSet;

  //constructor
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public sanitizer: DomSanitizer, public http:HttpClient, public GatewayService: GatewayServiceProvider) {
 
    this.setData();
    // //Get current profile posts
    // var x;
    // for (x in this.myprofile.posts){
    //   this.proPosts.push(this.posts[this.myprofile.posts[x]]);
    // }
  }

    setProfile(): Promise<{}>{
    return new Promise((resolve) => {
      if ( this.test !== undefined){
        resolve(this.test);
      }else{
         this.GatewayService.getEndpoint<ProfileDDB>('https://9tvh32rkk2.execute-api.us-east-2.amazonaws.com/test/profile?username=BurgerBoss')
        //this.GatewayService.getEndpoint<ProfileDDB>('https://9tvh32rkk2.execute-api.us-east-2.amazonaws.com/test/post?id=124')
        .then((getData) => { this.test = getData.output
        resolve(this.test);
       });
      }
    });
  }

  //Menu Toggle
  togglePro()
  {
    this.menu = !this.menu;
    this.swipe = true;
  }

  //View Switch
  changeView(type: string)
  {
    this.view = type;
  }

  //Changes bottom nav type
  toggle(type){
    if(type == 'follow')
      this.following = !this.following;
    else if(type == 'favorites')
      this.favorites = !this.favorites;
    else if(type == 'family')
      this.family = !this.family;
  }

  //Hide menu on swipe toggle
  swipeToggle(key){
    if(this.menu == false)
      this.swipe = key;
  }

  //Toggle Plus Menu
  plusTog()
  {
    this.plus = !this.plus;
  }

  //Toggle Edit modal menu
  edit()
  {
    let edit = this.modalCtrl.create(editPage,{
    cssClass: ""});
    edit.present();
  }

  //Go like Modal
  goLike(key,post){
    let buttonsPage = this.modalCtrl.create(buttonPage,{type:key,post:post},{
    cssClass: "button-modal"});
    buttonsPage.present();
  }

  //Go Comment Modal
  Comment(post){
    let comPage = this.modalCtrl.create(commentPage,{post:post},{
    cssClass: "button-modal"});
    comPage.present();
  }

  //Like Function
  Like(post){
  //Either like or unlike
  if(post.likes.Hit == "false")
  {
    post.likes.Hit = "true";
    post.likes.Amount =  String (parseInt(post.likes.Amount)+ 1);
    var newLike = {name:myprofile.name,username:myprofile.username,
    prof_pic: myprofile.prof_pic, id:"0"};
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

  //Go to ember modal
  ember(post){
    let embPage = this.modalCtrl.create(emberPage,{post:post},{
      cssClass: "ember-modal"});
    embPage.present();
  }

  //css button dynamic styling
  styleButton(){
    if((this.view == 'public' && this.following == true) || (this.view == 'friends'
      && this.favorites == true) || (this.view == 'family' && this.family == true))
      return{'color':'white'};
  }

  //Css button image dynamic styling
  stylebutt(post,type)
  {
    if(post.likes.Hit =='true' && type == 'like')
      return{"content": 'url(./assets/icon/Like.png)'}
    else if(post.embers.hit == 'true' && type == 'ember')
      return{"content": 'url(./assets/icon/emberxl.png)'}
  }

  //Css text dynamic Styling
  styleText(post,type){
    if(type == 'like' && post.likes.Hit == 'true')
      return{"color": '#AA0000'}
    else if(post.embers.hit == 'true' && type == 'ember')
      return{"color": '#1BEADD'}
  }

  //Middle toggle styling
  tfilter(key){
    if(this.view == key)
      return {"color":'black'};
  }

  //bottom row styling
  pfilter(key){
    if(this.view == key)
      return{"content": 'url(./assets/icon/'+key+'B.png)'}
  }
}

//Edit profile page Component
@Component({selector: 'page-edit',
templateUrl: 'profileSett.html'})

export class editPage {
 constructor(public viewCtrl: ViewController, public navParams: NavParams) {
 }

 goBack() {
   this.viewCtrl.dismiss();
 }
}

