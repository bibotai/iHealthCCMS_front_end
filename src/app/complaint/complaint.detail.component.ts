import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RedmineService} from '../services/redmine.service';
import {Complaint} from '../models/complaint';
import {ComplaintService} from '../services/complaint.service'
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
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
                console.log('param', params['id']);
                this
                    .redmineService
                    .getRedmineState(1494)
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