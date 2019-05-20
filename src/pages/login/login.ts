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
  signUpPage = SignUpPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.CognitoService.authenticate(this.email, this.password)
    .then(res => {
      console.log(res);
      this.goHome()
    }, err => {
      console.log(err);
    });
  }
  
  goHome()
  {
    //this.navCtrl.goToRoot({animate:false});
    this.navCtrl.push(HomePage,{},{animate:false});
  }

}
