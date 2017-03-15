import {Injectable} from '@angular/core';
// 导入Complaint
import {Complaint} from '../models/complaint';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ComplaintService {
    public complaintList : Complaint[];
    public complaint : Complaint;
    private complaintsUrl = 'http://localhost:3000'; // URL to web api

    constructor(private http : Http) {}
    getComplaints(pagesize : number, pagestart : number, sid : string = null) : Promise < Complaint[] > {
        let baseurl: string = this.complaintsUrl;
        console.log(sid);
        if (sid) {
            baseurl = `${this.complaintsUrl}/search/${Number(sid)}`;
            console.log(baseurl);
        } else {
            baseurl = `${this.complaintsUrl}/search`;
        }
        return this
            .http
            .get(`${baseurl}?pagesize=${pagesize}&pagestart=${pagestart}`)
            .toPromise()
            .then(response => this.complaintList = response.json()as Complaint[])
            .catch(this.handleError);
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