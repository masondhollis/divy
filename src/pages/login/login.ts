import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController, ModalOptions } from 'ionic-angular';
import { CognitoServiceProvider } from '../../providers/cognito-service/cognito-service';
import { SignUpPage } from "../../pages/sign-up/sign-up";
import { HomePage } from '../../pages/home/home';
import { ModalPage } from '../../modal/modal';
import { NativeStorage } from '@ionic-native/native-storage';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public CognitoService: CognitoServiceProvider, public modalCtrl: ModalController, public nativeStorage: NativeStorage) {
  }

  login() {
    var username = (<HTMLInputElement>document.getElementById('Uname')).value
    var password = (<HTMLInputElement>document.getElementById('Pword')).value
    if(username != null && password != null) {
      this.CognitoService.authenticate(username, password)
      .then(res => {
        //TODO store as one?
        this.nativeStorage.setItem('username', username)
        this.nativeStorage.setItem('password', password)
        console.log(res)
        var storage
        this.nativeStorage.getItem('username')
          .then(
              data => storage = data,
              error => console.error(error)
          );
        console.log("storage: " + storage)
        //this.goHome()
      }, err => {
        if(err.name == "UserNotFoundException" || err.name == "NotAuthorizedException")
        {
          this.openModalLogin("Sorry! Your username or password is incorrect.")
        }
        console.log(err);
      });
    }
  }

  openModal(){

    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      cssClass: "my-modal"
    };

    const myModalData = {
      name: "To reset your password, please email: austin.womack04@gmail.com."
    };

    const myModal = this.modalCtrl.create( ModalPage, {data:myModalData}, myModalOptions);
    myModal.present();
  }

  openModalLogin(problem){

    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      cssClass: "my-modal"
    };

    const myModalData = {
      name: problem
    };

    const myModal = this.modalCtrl.create( ModalPage, {data:myModalData}, myModalOptions);
    myModal.present();
  }

  goForgot(){
    this.toggle = true;
  }

  goHome()
  {
    this.navCtrl.push(HomePage,{},{animate:false});
  }

  goBack(){
    this.navCtrl.pop();
  }

}
