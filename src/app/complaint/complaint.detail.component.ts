import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RedmineService} from '../services/redmine.service';
import {Complaint} from '../models/complaint';
import {ComplaintService} from '../services/complaint.service'
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {redmineProjectIds} from '../config/app.config'
import 'rxjs/add/operator/toPromise';

@Component({selector: 'complaintdetail', templateUrl: './complaint.detail.component.html', styleUrls: ['./complaint.detail.component.css']})

export class ComplaintDetail implements OnInit {
    constructor(private complaintService : ComplaintService, private redmineService : RedmineService, private route : ActivatedRoute) {}
    complaint : Complaint;

    ngOnInit() : void {

        this
            .route
            .params
            .subscribe((params : Params) => {
                console.log('param:id', params['id']);
                console.log('param:type', params['type']);
                let projectid : number;
                if (params['type'] == 'googlePlay') {
                    projectid = redmineProjectIds.googleplay;
                } else if (params['type'] == 'Itunes Connect') {
                    projectid = redmineProjectIds.appstore;
                } else {
                    projectid = redmineProjectIds.fda;
                }
                console.log('projectid', projectid);
                console.log('redmineService.getRedmineState', new Date());
                this
                    .redmineService
                    .getRedmineState(projectid)
                    .then(data => {
                        this
                            .complaintService
                            .getComplaint(params['id'])
                            .then(data => {
                                this.complaint = data;
                                console.log(this.complaint);
                            });

                    })

            });

    }
}