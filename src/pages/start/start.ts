import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CognitoServiceProvider } from '../../providers/cognito-service/cognito-service';
import { SignUpPage } from "../../pages/sign-up/sign-up";
import { LoginPage } from '../../pages/login/login';

// Amazon Cognito Domain: https://divy.auth.us-east-2.amazoncognito.com
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class startPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider) {
  }

  SignIn(){
      this.navCtrl.push(LoginPage);
  }
  SignUp(){
    this.navCtrl.push(SignUpPage);
  }
}
