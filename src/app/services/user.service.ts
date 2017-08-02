import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {baseApiUrl} from '../config/app.config';
import {User} from '../models/user';
import {Result} from '../models/result';
import {Router} from '@angular/router';
import {Encrypt} from '../util/encrypt';
import {Token} from '../models/token';
import {HandleResult} from '../util/handleresult';
import {AuthorizationService} from '../services/authorization.service'

@Injectable()
export class UserService {
    constructor(private http : Http, private handleResult : HandleResult, private authorizationService : AuthorizationService) {}
    getUserList() {

        return new Promise < Result > ((resovle, reject) => {
            let baseurl : string = baseApiUrl;
            this
                .authorizationService
                .checkToken()
                .then(() => {

                    let body = {
                        "userId": localStorage.getItem("userid"),
                        "token": localStorage.getItem("token")
                    }
                    this
                        .http
                        .post(`${baseurl}user/getUserList`, body)
                        .toPromise()
                        .then(data => {
                            let objResult = this.handleResult.handleResult < User > (data);

                            resovle(objResult);
                        })
                        .catch(this.handleError);
                });
        })
    }

    addUser(username, password) {
        return new Promise < Result > ((resovle, reject) => {
            let baseurl : string = baseApiUrl;
            this
                .authorizationService
                .checkToken()
                .then(() => {

                    let body = {
                        "userId": localStorage.getItem("userid"),
                        "token": localStorage.getItem("token"),
                        "addUser": {
                            "username": username,
                            "password": password,
                            "role": 2
                        }
                    }

                    this
                        .http
                        .post(`${baseurl}user/add`, body)
                        .toPromise()
                        .then(data => {
                            let objResult = this.handleResult.handleResult < User > (data);

                            resovle(objResult);
                        })
                        .catch(this.handleError);
                })
        });
    }

    modifyUser(_id, password) {
        return new Promise < Result > ((resovle, reject) => {
            let baseurl : string = baseApiUrl;
            this
                .authorizationService
                .checkToken()
                .then(() => {

                    let body = {
                        "userId": localStorage.getItem("userid"),
                        "token": localStorage.getItem("token"),
                        "user": {
                            "_id": _id,
                            "password": password
                        }
                    }
                    console.log(body);

                    this
                        .http
                        .post(`${baseurl}user/update`, body)
                        .toPromise()
                        .then(data => {
                            let objResult = this.handleResult.handleResult < User > (data);

                            resovle(objResult);
                        })
                        .catch(this.handleError);
                })
        });
    }

    deleteUser(_id) {
        return new Promise < Result > ((resovle, reject) => {
            let baseurl : string = baseApiUrl;
            this
                .authorizationService
                .checkToken()
                .then(() => {

                    let body = {
                        "userId": localStorage.getItem("userid"),
                        "token": localStorage.getItem("token"),
                        "moveId": _id
                    }
                    console.log(body);

                    this
                        .http
                        .post(`${baseurl}user/remove`, body)
                        .toPromise()
                        .then(data => {
                            let objResult = this.handleResult.handleResult < User > (data);

                            resovle(objResult);
                        })
                        .catch(this.handleError);
                })
        });
    }

    private handleError(error : any) : Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}