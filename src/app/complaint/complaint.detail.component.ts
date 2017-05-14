import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RedmineService} from '../services/redmine.service';
import {Complaint} from '../models/complaint';
import {ComplaintService} from '../services/complaint.service'
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {redmineProjectIds} from '../config/app.config';
import {ComplaintListService} from '../services/complaint.list.service';
import {DiaglogService} from '../services/diaglog.service';
import 'rxjs/add/operator/toPromise';

@Component({selector: 'complaintdetail', templateUrl: './complaint.detail.component.html', styleUrls: ['./complaint.detail.component.css']})

export class ComplaintDetail implements OnInit {
    constructor(private complaintService : ComplaintService, public diaglogService : DiaglogService, public dialog : MdDialog, private redmineService : RedmineService, private route : ActivatedRoute, private complaintListService : ComplaintListService) {}
    complaint : Complaint;
    objButtonShow : {};
    belong : string;

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
                        let belong = '';
                        if (this.complaint.belong == 0) {
                            belong = '中国';
                        } else if (this.complaint.belong == 1) {
                            belong = '欧洲';
                        } else if (this.complaint.belong == 2) {
                            belong = '美国';
                        }
                        this.belong = belong;
                        console.log(this.complaint);
                    });

            })

    }
    openRedmineDialog(raw) : void {
        this
            .diaglogService
            .openRedmineDialog(this.dialog, raw, function () {
                location.reload();
            });
    }
    openIgnoreDialog(raw, type) : void {
        this
            .diaglogService
            .openIgnoreDialog(this.dialog, raw, type, function () {
                location.reload();
            });
    }

    goodComplaint(raw) : void {
        this
            .complaintService
            .decideGoodComplaint(raw._id, '', 5)
            .then((data) => {
                if (data == 'ok') 
                    this.ngOnInit();
                }
            )
    }

    reductionIgnore(raw) : void {

        this
            .redmineService
            .reduction(raw._id)
            .then((data) => {
                if (data) {
                    if (data == 'ok') 
                        this.ngOnInit();
                    }
                });

    }

}