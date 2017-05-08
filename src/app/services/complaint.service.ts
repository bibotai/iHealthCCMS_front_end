import {Injectable} from '@angular/core';
// 导入Complaint
import {Complaint} from '../models/complaint';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {baseApiUrl} from '../config/app.config';
import {RedmineService} from '../services/redmine.service';

@Injectable()
export class ComplaintService {
    public complaintList : Complaint[];
    public complaint : Complaint;
    private complaintsUrl = baseApiUrl; // URL to web api

    constructor(private http : Http, private redmineService : RedmineService) {}
    getComplaints(pagesize : number, pagestart : number, query = null) : Promise < Complaint[] > {
        let baseurl: string = this.complaintsUrl;
        baseurl = `${this.complaintsUrl}find`;
        return new Promise < Complaint[] > ((resolve, reject) => {
            let body = {
                rule: query,
                pagestart: pagestart,
                pagesize: pagesize
            };
            this
                .http
                .post(baseurl, body)
                .toPromise()
                .then(response => {
                    this.complaintList = response.json()as Complaint[];
                    resolve(this.complaintList);
                    // console.log(response); console.log(this.complaintList);
                })
                .catch(this.handleError);
        })

    }

    getComplaint(id : string) : Promise < Complaint > {
        let baseurl: string = this.complaintsUrl;
        return this
            .http
            .get(`${baseurl}rewContent/${id}`)
            .toPromise()
            .then(response => this.complaint = response.json()as Complaint)
            .catch(this.handleError);
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