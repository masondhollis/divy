import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { CognitoServiceProvider } from '../../providers/cognito-service/cognito-service';
import { SignUpPage } from "../../pages/sign-up/sign-up";
import { HomePage } from '../../pages/home/home';


// Amazon Cognito Domain: https://divy.auth.us-east-2.amazoncognito.com
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;
  toggle = false;
  signUpPage = SignUpPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider) {
  }

  login() {
    if((<HTMLInputElement>document.getElementById('Uname')).value != null &&
    (<HTMLInputElement>document.getElementById('Pword')).value != null){
      this.CognitoService.authenticate((<HTMLInputElement>document.getElementById('Uname')).value, (<HTMLInputElement>document.getElementById('Pword')).value)
      .then(res => {
        console.log(res);
        this.goHome()
      }, err => {
        console.log(err);
      });
    }
  }
  goForgot(){
    this.toggle = true;
  }

  goHome()
  {
    //this.navCtrl.goToRoot({animate:false});
    this.navCtrl.push(HomePage,{},{animate:false});
  }

  goBack(){
    this.navCtrl.pop();
  }

  //TODO: For the Forgot password functionality show
  //austin.womack04@gmail.com
}
