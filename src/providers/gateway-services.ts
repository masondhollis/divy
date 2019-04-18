import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()

export class GatewayServiceProvider {
    url: string;
    data;

    constructor(public http: HttpClient) {
        ////console.log('Hello Gateway Serive Provider');
        this.data = [];
    }

    async getEndpoint<ProfileDDB>(endP: string){
        console.log('called');
        let promise = await new Promise((resolve, reject) =>{
            let url = endP;
            this.http
                .get<ProfileDDB>(url)
                .toPromise()
                .then(
                    res => {
                        //success
                        this.data = res;
                        resolve();
                    },
                    msg => {
                        //error
                        reject(msg);
                    }
                );
        });
        return this.data;
    }
}



