import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ModalOptions} from 'ionic-angular';
import { CognitoServiceProvider } from '../../providers/cognito-service/cognito-service';
import { ModalPage } from '../../modal/modal';
import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {GatewayServiceProvider} from '../../providers/gateway-services';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface ProfileDDB {
  output: [{}];
}

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  email: string;
  password: string;
  type = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider,
    public modalCtrl: ModalController) {
  }
  

  goPersonal(){
    this.type = 1;
  }

  openModal(){

    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      cssClass: "my-modal"
    };

    const myModalData = {
      name: "Sorry! This component is not available via beta version."
    };

    const myModal = this.modalCtrl.create( ModalPage, {data:myModalData}, myModalOptions);
    myModal.present();
  }

  goCompany(){
    this.type = 2;
  }
  goBack(){
    this.navCtrl.pop();
  }

  goNext(){
    if(this.type == 1){
      this.navCtrl.push(pinfo);
    }
    else if(this.type == 2){
      //this.navCtrl.push(corpinfo)
    }
    else{
      //throw an error for an invalid choice
    }
  }

  signStyle(type){
    if(this.type == type)
      return {"border": "none", "background-color":"lightgrey"};
  }
}

//Page for showing user profiles who like or comment on a post
@Component({selector: 'page-pinfo',
templateUrl:`pinfo.html`})

export class pinfo {
  User = <any>{}
  tempUsername = "";
  toggle = false;
  //constructor
  constructor(public navCtrl: NavController,public CognitoService: CognitoServiceProvider,public modalCtrl: ModalController, public GatewayService: GatewayServiceProvider) {
  }

  openModal(errorResponse: string){

    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      cssClass: "my-modal"
    };

    const myModalData = {
      name: errorResponse
    };

    const myModal = this.modalCtrl.create( ModalPage, {data:myModalData}, myModalOptions);
    myModal.present();
  }

  goNext(){
    if(!this.toggle){
      if((<HTMLInputElement>document.getElementById('Name')).value != null &&
      (<HTMLInputElement>document.getElementById('Uname')).value != null &&
      (<HTMLInputElement>document.getElementById('Pword')).value != null){

        this.User.name = (<HTMLInputElement>document.getElementById('Name')).value;
        this.User.uname = (<HTMLInputElement>document.getElementById('Uname')).value;
        this.User.password = (<HTMLInputElement>document.getElementById('Pword')).value;
        

        if(this.User.password.length < 8){
          this.openModal("Sorry! Your password must be at least 8 characters long.");
        }
        else{
          this.toggle = true;
        }
        //add error checking for username being used
        //this.GatewayService.getEndpoint<ProfileDDB>('https://9tvh32rkk2.execute-api.us-east-2.amazonaws.com/test/profile').then((getData) => { this.tempUsername= getData.output});
        
      }
      else{
        //TODO: Show some error code on user input
      }
    }
    else{
      this.createUser();
    }
  }

  createUser(){
    if((<HTMLInputElement>document.getElementById('Email')).value != null &&
    (<HTMLInputElement>document.getElementById('Pnum')).value != null){
      this.User.email = (<HTMLInputElement>document.getElementById('Email')).value;
      this.User.phone = (<HTMLInputElement>document.getElementById('Pnum')).value;
      if(this.User.email.endsWith("@lakesidesd.org")){
        this.CognitoService.signUp(this.User.email, this.User.password, this.User.uname, this.User.phone, this.User.name).then(
          res => {
            console.log(res);
            this.CognitoService.authenticate(this.User.email, this.User.password)
            .then(res => {
              console.log(res);
              this.goHome()
            }, err => {
              console.log(err);
            });
          },
          err => {
            if(err.name == "UsernameExistsException")
            {
              this.openModal("This email is already in use. Please try another.")
            }
            console.log(err);
          }
        );
      }
      else{
        this.openModal("Sorry! You must sign up using your Lakeside Email Address.")
      }
      
      //Do the cognito call here
      
      
    }
    else{
      //show some null error code
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  goHome()
  {
    this.navCtrl.push(HomePage,{},{animate:false});
  }
}
