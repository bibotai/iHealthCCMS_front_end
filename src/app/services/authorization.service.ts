import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {baseApiUrl} from '../config/app.config';
import {User} from '../models/user';
import {Result} from '../models/result';
import {Router} from '@angular/router';
import {Encrypt} from '../util/encrypt';
import {Token} from '../models/token';
import {HandleResult} from '../util/handleresult'

@Injectable()
export class AuthorizationService {
    constructor(private http : Http, private router : Router, private handleResult : HandleResult) {}
    private baseApiUrl = baseApiUrl;
    logout() {
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("deadline");
        this
            .router
            .navigate(['login']);
    }
    userLogin(username : string, password : string) {
        console.log(username, password);
        return new
        Promise < Result > ((resolve, reject) => {
            this
                .http
                .post(this.baseApiUrl + 'user/login', {
                    "username": username,
                    "password": password
                })
                .subscribe(data => {
                    let objResult = new Result();
                    let body = JSON.parse(data['_body']);
                    if (body['success']) {
                        let objUser = new User();
                        objUser.userId = body['userId'];
                        objUser.username = body['username'];
                        objResult.content = objUser;
                        objResult.success = true;
                        localStorage.setItem("userid", objUser.userId);
                        localStorage.setItem("username", objUser.username);
                        this
                            .getAccessTokenforLogin(objUser.userId, password)
                            .then(result => {
                                console.log('getAccessTokenforLogin', result);
                                if (result) {
                                    console.log('login success router navigate to complaintlist')
                                    this
                                        .router
                                        .navigate([
                                            'complaintlist', 'notprocessed'
                                        ], {
                                            queryParams: {
                                                page: 1
                                            }
                                        });
                                } else {
                                    //处理异常
                                };
                            })

                    } else {
                        objResult.success = false;
                        objResult.errCode = Number(body['code']);
                        objResult.errMessage = body['message'];
                    }

                    resolve(objResult);

                }, error => reject(error))
        })

    }

    getAccessTokenforLogin(userId : string, password : string) {
        console.log('getAccessTokenforLogin', userId, password);
        return new Promise < boolean > ((resolve, reject) => {
            this
                .getAccessToken(userId, password)
                .then(objResult => {
                    if (objResult.success) {
                        localStorage.setItem("token", objResult.content.token);
                        localStorage.setItem("refreshtoken", objResult.content.refresh_token);
                        localStorage.setItem("deadline", objResult.content.deadline);
                        console.log('getAccessTokenforLogin true');
                        resolve(true)
                    } else {
                        console.log('getAccessTokenforLogin false');
                        resolve(false);
                    }
                });
        })

    }

    handleToken(objResult : Result) {
        if (!objResult.success) {
            let errCode = objResult.errCode;
            if (errCode == 1019 || errCode == 1020) {
                this.refreshAccessToken(localStorage.getItem("userid"), localStorage.getItem("refreshtoken")).then(objResult => {
                    if (objResult.success) {
                        localStorage.setItem("token", objResult.content.token);
                        localStorage.setItem("refreshtoken", objResult.content.refresh_token);
                        localStorage.setItem("deadline", objResult.content.deadline);
                        console.log('refreshAccessToken', objResult);

                    } else {
                        console.log('refreshAccessToken error');
                    }
                })
            }
        }
    }

    getAccessToken(userId : string, password : string) {
        let timeStamp = (new Date())
            .valueOf()
            .toString();

        let grant_type = 'token';
        let key = userId + timeStamp.substring(timeStamp.length - 8, timeStamp.length);
        let content = userId + password + timeStamp;
        let objEncrypt = new Encrypt();
        // let grantStr = objEncrypt.encrypt('58ddc7fce9a9b92dd142bd05bb11498095290652',
        // '58ddc7fce9a9b92dd142bd0595290652');
        let grantStr = objEncrypt.encrypt(content, key);
        console.log('userId:' + userId, 'password:' + password, 'timeStamp:' + timeStamp, 'content:' + content, 'key:' + key, 'grantStr:' + grantStr);
        return new Promise < Result > ((resolve, reject) => {
            this
                .http
                .post(this.baseApiUrl + 'token/getAccessToken', {
                    "grant_type": "token",
                    "userId": userId,
                    "grantStr": grantStr,
                    "timeStamp": timeStamp
                })
                .subscribe(data => {
                    let objResult = this.handleResult.handleTokenResult < Token > (data);
                    resolve(objResult);
                }, error => {
                    console.log('getAccessToken', error);
                    reject(error)
                })
        })
    }

    checkCredentials() {
        if (localStorage.getItem("userid") === null) {
            this
                .router
                .navigate(['login']);
        }
    }

    checkToken() {
        return new Promise((resolve) => {
            let expiresTime = new Date(localStorage.getItem("deadline")).valueOf();
            let time = new Date().valueOf();
            console.log(expiresTime, new Date(localStorage.getItem("deadline")));
            console.log(time, new Date())
            if (expiresTime - time < 10000) {
                console.log(expiresTime - time);
                console.log('checkToken', localStorage.getItem("userid"), localStorage.getItem("refreshtoken"), localStorage.getItem("token"));
                this.refreshAccessToken(localStorage.getItem("userid"), localStorage.getItem("refreshtoken")).then(objResult => {

                    if (objResult.success) {
                        localStorage.setItem("token", objResult.content.token);
                        localStorage.setItem("refreshtoken", objResult.content.refresh_token);
                        localStorage.setItem("deadline", objResult.content.deadline);
                        console.log('refreshAccessToken', objResult);

                    } else {
                        if (objResult.errCode == 1019 || objResult.errCode == 1020 || objResult.errCode == 1018 || objResult.errCode == 1017) 
                            console.log('refreshAccessToken error');
                        this.logout();
                    }

                })
            }
            resolve();
        })

    }

    refreshAccessToken(userId : string, refreshToken : string) {
        let grant_type = 'refresh_token';
        return new Promise < Result > ((resolve, reject) => {
            this
                .http
                .post(this.baseApiUrl + 'token/getAccessToken', {
                    "grant_type": grant_type,
                    "userId": userId,
                    "refresh_token": refreshToken
                })
                .subscribe(data => {
                    let objResult = this.handleResult.handleTokenResult < Token > (data);
                    resolve(objResult);

                })
        })

    }

}