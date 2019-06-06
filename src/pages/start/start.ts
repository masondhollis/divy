import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CognitoServiceProvider } from '../../providers/cognito-service/cognito-service';
import { SignUpPage } from "../../pages/sign-up/sign-up";
import { LoginPage } from '../../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../../pages/home/home';


// Amazon Cognito Domain: https://divy.auth.us-east-2.amazoncognito.com
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class startPage {
  type = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider, public nativeStorage: NativeStorage) {

  }

  login(username, password) {
      this.CognitoService.authenticate(username, password)
      .then(res => {
        console.log(res);
        this.navCtrl.push(HomePage,{},{animate:false});
      }, err => {
        console.log(err);
      });
  }

  // TODO move to splash
  ionViewWillEnter(){
      console.log(this.nativeStorage.keys())
      var username
      var password

      var uPromise = this.nativeStorage.getItem('username')
        .then(
            data => {
                console.log(data)
                username = data
            },
            error => console.error(error)
        );
      var pPromise = this.nativeStorage.getItem('password')
        .then(
           data => password = data,
           error => console.error(error)
       )
      Promise.all([uPromise, pPromise]).then(values => {
          console.log("username: " + username)
          if (username && password) {
              this.login(username, password)
          }
      });
  }


  // Get Item is async
  SignIn(){
    this.type = 1;
    this.navCtrl.push(LoginPage);
  }

  SignUp(){
    this.type = 2;
    this.navCtrl.push(SignUpPage);
  }

  signStyle(type){
    if(this.type == type)
      return {"border": "none", "background-color":"lightgrey"};
  }
}
