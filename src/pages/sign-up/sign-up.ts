import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import { CognitoServiceProvider } from '../../providers/cognito-service/cognito-service';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider,
    public modalCtrl: ModalController) {
  }
  register() {
    this.CognitoService.signUp(this.email, this.password).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  goPersonal(){
    this.navCtrl.push(pinfo);

  }
}
//Page for showing user profiles who like or comment on a post
@Component({selector: 'page-pinfo',
templateUrl:`pinfo.html`})

export class pinfo {
  User = {}
  toggle = false;
  //constructor
  constructor(public navCtrl: NavController) {
  }

  goNext(){
    if(!this.toggle){
      if((<HTMLInputElement>document.getElementById('Name')).value != null &&
      (<HTMLInputElement>document.getElementById('Uname')).value != null &&
      (<HTMLInputElement>document.getElementById('Pword')).value != null){

        this.User.name = (<HTMLInputElement>document.getElementById('Name')).value;
        this.User.username = (<HTMLInputElement>document.getElementById('Uname')).value;
        this.User.password = (<HTMLInputElement>document.getElementById('Pword')).value;
        this.toggle = true;
      }
      else{
        //TODO: Show some error code
      }
    }
    else{
      this.createUser();
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  createUser(){
    this.User.email = (<HTMLInputElement>document.getElementById('Email')).value;
    this.User.phone = (<HTMLInputElement>document.getElementById('Pnum')).value;
  }
}
