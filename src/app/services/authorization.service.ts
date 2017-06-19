import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {baseApiUrl} from '../config/app.config';
import {User} from '../models/user';
import {Result} from '../models/result'
@Injectable()
export class AuthorizationService {
    constructor(private http : Http) {}
    private baseApiUrl = baseApiUrl;
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
                        objResult.content = objUser;
                        objResult.success = true;
                    } else {
                        objResult.success = false;
                        objResult.errCode = Number(body['code']);
                        objResult.errMessage = body['message'];
                    }
                    resolve(objResult);

                }, error => reject(error))
        })
    }

}