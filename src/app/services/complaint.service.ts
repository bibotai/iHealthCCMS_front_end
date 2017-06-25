import {Injectable} from '@angular/core';
// 导入Complaint
import {Complaint} from '../models/complaint';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {baseApiUrl} from '../config/app.config';
import {RedmineService} from '../services/redmine.service';
import {Result} from '../models/result';
import {AuthorizationService} from '../services/authorization.service'
import {HandleResult} from '../util/handleresult';

@Injectable()
export class ComplaintService {
    public complaintList : Complaint[];
    public complaint : Complaint;
    private complaintsUrl = baseApiUrl; // URL to web api

    constructor(private http : Http, private redmineService : RedmineService, private authorizationService : AuthorizationService, private handleResult : HandleResult) {}
    getComplaintCount(query = null) : Promise < string > {
        return new Promise < string > ((resolve, reject) => {
            let baseurl : string = this.complaintsUrl;
            this
                .authorizationService
                .checkToken()
                .then(() => {

                    let body = {
                        "userId": localStorage.getItem("userid"),
                        "token": localStorage.getItem("token"),
                        "rule": query
                    }
                    this
                        .http
                        .post(`${baseurl}getCount`, body)
                        .toPromise()
                        .then(response => {
                            let count = response
                                .json()
                                .count;
                            resolve(count);
                        })
                        .catch(this.handleError);
                });
        })

    }
    getComplaints(pagesize : number, pagestart : number, query = null) : Promise < Result > {
        let baseurl: string = this.complaintsUrl;
        baseurl = `${this.complaintsUrl}find`;
        console.log(query);
        return new Promise < Result > ((resolve, reject) => {
            this
                .authorizationService
                .checkToken()
                .then(() => {
                    let body = {
                        userId: localStorage.getItem("userid"),
                        rule: query,
                        pagestart: pagestart,
                        token: localStorage.getItem("token"),
                        pagesize: pagesize
                    };
                    this
                        .http
                        .post(baseurl, body)
                        .toPromise()
                        .then(data => {
                            let objResult = this.handleResult.handleResult < Complaint[] > (data);
                            resolve(objResult);
                            console.log(data);
                            // console.log(response); console.log(this.complaintList);
                        }, error => console.log(error))
                        .catch(this.handleError);
                })

        })

    }

    getComplaint(id : string) : Promise < Result > {
        let baseurl: string = this.complaintsUrl;
        let userId = localStorage.getItem("userid");
        return new Promise < Result > ((resovle, reject) => {
            this
                .authorizationService
                .checkToken()
                .then(() => {
                    let token = localStorage.getItem("token");
                    this
                        .http
                        .get(`${baseurl}rewContent/${id}?userId=${userId}&token=${token}`)
                        .toPromise()
                        .then(data => {
                            let objResult = this.handleResult.handleResult < Complaint > (data);

                            resovle(objResult);
                        }, error => {
                            console.log(error);
                        })
                        .catch(this.handleError);

                });
        })

    }

    decideGoodComplaint(_id : string, reason : string, ignoretype : number) : Promise < string > {
        return new Promise < string > ((resolve, reject) => {
            this
                .redmineService
                .ignore(_id, reason, ignoretype)
                .then((data) => {
                    resolve(data);
                })
                .catch(this.handleError);
        });
    }

    private handleError(error : any) : Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}