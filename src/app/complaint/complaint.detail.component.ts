import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RedmineService} from '../services/redmine.service';
import {Complaint} from '../models/complaint';
import {ComplaintService} from '../services/complaint.service'
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {redmineProjectIds} from '../config/app.config';
import {ComplaintListService} from '../services/complaint.list.service';
import 'rxjs/add/operator/toPromise';

@Component({selector: 'complaintdetail', templateUrl: './complaint.detail.component.html', styleUrls: ['./complaint.detail.component.css']})

export class ComplaintDetail implements OnInit {
    constructor(private complaintService : ComplaintService, private redmineService : RedmineService, private route : ActivatedRoute, private complaintListService : ComplaintListService) {}
    complaint : Complaint;
    objButtonShow : {};

    ngOnInit() : void {

        this
            .route
            .params
            .subscribe((params : Params) => {
                console.log('param:id', params['id']);
                console.log('param:type', params['type']);

                this
                    .complaintService
                    .getComplaint(params['id'])
                    .then(data => {
                        this.complaint = data;
                        this.objButtonShow = this
                            .complaintListService
                            .decideButtonShow(this.complaint.state);
                        console.log(this.complaint);
                    });

            })

    }
}