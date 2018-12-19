import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWSCognito from "amazon-cognito-identity-js";

@Injectable()
export class CognitoServiceProvider {
  _POOL_DATA = {
    UserPoolId : "us-east-2_mfLfbRVAy",
      ClientId: "5n063j70a3uq6ld4cco88n4pqi"
  };
  constructor(public http: HttpClient) {
    console.log('Hello CognitoServiceProvider Provider');
  }

  signUp(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      let userAttribute = []; // array of CognitoUserAttribute
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({Name: 'email', Value: email})
      );
      userPool.signUp(email, password, userAttribute, null, function(err, result){
        if(err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
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

  authenticate(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);
      
      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: email,
        Password: password 
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolved(result);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {
          // User was signed up by admin and must provide new password and required attributes.

          userAttributes.email = email;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function(result) {},
            onFailure: function(error) {
              reject(error);
            }
          });
        }
      });
    });
  }
}
