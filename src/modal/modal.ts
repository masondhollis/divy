import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector:'page-modal',
    templateUrl: 'modal.html'
})



export class ModalPage {

    data;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {}

    closeModal(){
        this.viewCtrl.dismiss();
    }

    ionViewWillLoad(){
        this.data = this.navParams.get('data');
    }
}
