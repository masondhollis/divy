import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
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
}
