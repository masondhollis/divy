import 'rxjs/add/operator/toPromise'; //Alycia Added
import { Http } from '@angular/http'; //Alycia added
import {Component} from '@angular/core';
var APIG_ENDPOINT= 'https://9tvh32rkk2.execute-api.us-east-2.amazonaws.com/test/profile/10353'; //id

@Component({})

export class GatewayServiceProvider {

test = [];
APIG_ENDPOINT = '';

constructor(public http: Http)
 {
     console.log('Hello Gateway Serive Provider');
}

getEndpoint(endP){
    APIG_ENDPOINT = endP;
    this.http.get(APIG_ENDPOINT)
        .toPromise()
        .then(response =>  {
            this.test = response.json();
             console.log(this.test); 
        })
         .catch(error => {
            console.log(error.json())
         });
}

}
