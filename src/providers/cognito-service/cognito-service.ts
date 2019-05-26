import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWSCognito from "amazon-cognito-identity-js";
import {Config as AppConfig } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import { ModalPage } from '../../modal/modal';

var AWS = require('aws-sdk');

@Injectable()

export class CognitoServiceProvider {
  _POOL_DATA = {
    UserPoolId : "us-east-2_mfLfbRVAy",
      ClientId: "5n063j70a3uq6ld4cco88n4pqi"
  };

  private unauthCreds: any
  private poolData: AWSCognito.ICognitoUserPoolData
  private userPool: AWSCognito.CognitoUserPool
  private _cognitoUser: AWSCognito.CognitoUser
  private session: AWSCognito.CognitoUserSession
  private _signoutSubject: Subject<string> = new Subject<string>()
  private _signinsubject: Subject<string> = new Subject<string>()

  constructor(private config: AppConfig) {
    console.log('Hello CognitoServiceProvider Provider');
    this.userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA)
    this.refreshOrResetCreds()
  }

  // get signoutNotification () { return Observable.create( fn => this._signoutSubject.subscribe(fn))}
  //get signinNotification () { return Observable.create( fn => this._signinsubject.subscribe(fn))}
  
  get cognitoUser (): AWSCognito.CognitoUser { 
    return this._cognitoUser
  }

  get currentIdentity (): string {
    return AWS.config.credentials.identityId
  }

  private getNewCognitoUser (email): AWSCognito.CognitoUser {
    return new AWSCognito.CognitoUser ({Username: email, Pool: this.userPool})
}

private authDetails (email, password): AWSCognito.AuthenticationDetails {
  return new AWSCognito.AuthenticationDetails({Username: email, Password: password})
}

  private refreshOrResetCreds () {
    this._cognitoUser = this.userPool.getCurrentUser()

    if(this._cognitoUser !== null) {
      this.refreshSession()
    }
    else {
      this.resetToken()
    }
  }

  private refreshSession(): Promise<AWSCognito.CognitoUserSession> {
    let self = this
    return new Promise ((resolve, reject) => {
      self._cognitoUser.getSession((err, session) => {
        if(err){
          console.log('Error refreshing user session', err);
          return reject(err)
        }
        console.log(`${new Date()} - Refreshed session for ${self._cognitoUser.getUsername()}. Valid?: `, session.isValid())
        self.saveToken(session)
        resolve(session)
      })
    })
  }

  private resetToken(clearCache: boolean = false) {
    console.log('Resetting credentials for unauth access')
    this._cognitoUser = null
    this.unauthCreds = this.unauthCreds || new AWS.CognitoIdentityCredentials({IdentityPoolId: this.config.get('identityPool')})
    if (clearCache){
      this.unauthCreds.clearCachedId()
    }
    this.setCredentials(this.unauthCreds)
  }

  private setCredentials(newCreds) {
    AWS.config.credentials = newCreds
  }

  private buildLogins (token) {
    let key = this.config.get('idpURL') + '/' + this.config.get('userPoolId')
    let json = { IdentityPoolId: this.config.get('identityPool'), Logins: {}}
    json.Logins[key] = token
    return json
  }

  private buildToken (){
    let json = this.buildLogins(this.session.getIdToken().getJwtToken())
    return new AWS.CognitoIdentityCredentials(json)
  }

  private saveToken (session, cognitoUser?): void {
    this.session = session
    if(cognitoUser) {
      this._cognitoUser = cognitoUser
    }
    this.setCredentials(this.buildToken())
  }

  private buildAttributes(email, password): Array<AWSCognito.CognitoUserAttribute>{
    let attributeList = []
    let attributeEmail = new AWSCognito.CognitoUserAttribute({Name: 'email', Value: email})
    attributeList.push(attributeEmail)
    return attributeList
  }

  signUp(email, password): Promise<AWSCognito.CognitoUser>{
    let self = this
    return new Promise((resolve, reject) => {
      try{
        self.userPool.signUp(email, password, self.buildAttributes(email, password), null, (err, result) => {
          if (err) {
            return reject(err)
          }
          console.log('Register', result)
          resolve(result.user)
        })
      }
      catch (e) {reject(e)}
    })
  }

  confirmUser(verificationCode, userName) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);
      
      const cognitoUser = new AWSCognito.CognitoUser({
        Username : userName,
        Pool: userPool
      });

      cognitoUser.confirmRegistration(verificationCode, true, function(err, result){
        if(err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }

  authenticate(email, password): Promise<AWSCognito.CognitoUser> { 
    let cognitoUser = this.getNewCognitoUser(email)
    let self = this
    return new Promise((resolve, reject) => {
      try{
        cognitoUser.authenticateUser(self.authDetails(email, password), {
          onSuccess: (session) => {
            console.log(`Signed in user ${cognitoUser.getUsername()}. Session valid?: `, session.isValid())
            self.saveToken(session, cognitoUser)
            self._signinsubject.next(cognitoUser.getUsername())
            resolve(cognitoUser)
          },
          newPasswordRequired: userAttributes => {        
                  userAttributes.email = email;
                  delete userAttributes.email_verified;
        
                  cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
                    onSuccess: function(result) {},
                    onFailure: function(error) {
                      reject(error);
                    }
                  });
                },
          onFailure: reject
        })
      }
      catch (e) {reject(e)}
    })
  }

  signout () {
    if (this._cognitoUser) {
      let name = this._cognitoUser.getUsername()
      this._cognitoUser['signOut']()
      this.resetToken(true)
      this._signoutSubject.next(name)
    }
  }
}

