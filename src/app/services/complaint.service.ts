import {Injectable} from '@angular/core';
// 导入Complaint
import {Complaint} from '../models/complaint';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ComplaintService {
    public complaintList : Complaint[];
    public complaint : Complaint;
    private complaintsUrl = 'http://10.0.0.3:3000'; // URL to web api

    constructor(private http : Http) {}
    getComplaints(pagesize : number, pagestart : number, sid : string = null, query = null) : Promise < Complaint[] > {
        let baseurl: string = this.complaintsUrl;
        console.log(sid);
        let searchfind = 'search';
        if (query) {
            searchfind = 'find';
            baseurl = `${this.complaintsUrl}/${searchfind}`;
        } else {
            if (sid) {
                baseurl = `${this.complaintsUrl}/${searchfind}/${Number(sid)}`;

            } else {
                baseurl = `${this.complaintsUrl}/${searchfind}`;
            }
        }

        console.log(baseurl);

        if (query) {
            return new Promise < Complaint[] > ((resolve, reject) => {
                let body = {
                    rule: query,
                    pagestart: pagestart,
                    pagesize: pagesize
                };
                console.log(JSON.stringify(body));
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

        } else {
            return this
                .http
                .get(`${baseurl}?pagesize=${pagesize}&pagestart=${pagestart}`)
                .toPromise()
                .then(response => this.complaintList = response.json()as Complaint[])
                .catch(this.handleError);
        }
    }

    getComplaint(id : string) : Promise < Complaint > {
        let baseurl: string = this.complaintsUrl;
        console.log('url', `${baseurl}/rewContent/${id}`);
        return this
            .http
            .get(`${baseurl}/rewContent/${id}`)
            .toPromise()
            .then(response => this.complaint = response.json()as Complaint)
            .catch(this.handleError);
    }

    private handleError(error : any) : Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}