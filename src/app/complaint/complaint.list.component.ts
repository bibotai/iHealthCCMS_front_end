import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {ComplaintService} from '../services/complaint.service';
import {Complaint} from '../models/complaint';
import {ComplaintDisplay} from '../models/complaintdisplay';
import {ActivatedRoute, Params} from '@angular/router';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';

import {RedmineService} from '../services/redmine.service';
import 'rxjs/add/operator/map';
//switchMap运算符
import 'rxjs/add/operator/switchMap';
//弹出层
import {SendRedmineDialog} from './sendredmine.dialog.component';
import {IgnoreDialog} from './ignore.dialog.component';
@Component({selector: 'complaintlist', templateUrl: './complaint.list.component.html', styleUrls: ['./complaint.list.component.css']})

export class ComplaintListComponent implements OnInit {
    constructor(private complaintService : ComplaintService, private redmineService : RedmineService, private route : ActivatedRoute, public dialog : MdDialog, private formbuilder : FormBuilder) {

        this.searchForm = this
            .formbuilder
            .group({orgin: '', app: ''});
    }
    complaints : Complaint[];
    complaintsDisplay : ComplaintDisplay[] = [];
    title : String;
    //加载
    loadingIndicator : boolean = true;
    //分页
    offset : number = 0;
    limit : number = 10;
    isOverflow : boolean = false;
    sid : string;
    isSendShow : boolean;
    isIgnoreShow : boolean;
    searchForm : any;
    orgins : any;
    apps : any;

    getComplaints(offset, limit) : void {
        this
            .complaintService
            .getComplaints(limit, offset + 1, this.sid)
            .then(complaints => this.complaints = complaints)
            .then(complaints => {
                this.complaintsDisplay = this.getComplaintsDisplay(complaints);
                this.loadingIndicator = false;
                console.log(complaints);
                if (complaints.length == 0) 
                    this.isOverflow = false;

                }
            );

    }

    onPageDown() : void {
        //Todo:这里有个bug
        if(!this.isOverflow) {
            this.offset++;
            this.getComplaints(this.offset, this.limit);
        }
    }

    onPageUp() {
        if (this.offset > 0) 
            this.offset--;
        this.getComplaints(this.offset, this.limit);
    }

    getComplaintsDisplay(complaints : Complaint[]) : ComplaintDisplay[] {
        let complaintsDisplayArr : ComplaintDisplay[] = [];
        complaints.forEach((complaint, index) => {
            let complaintDisplay = new ComplaintDisplay();
            complaintDisplay.id = (index + 1).toString();
            complaintDisplay._id = complaint._id;
            complaintDisplay.appname = complaint.appName;
            complaintDisplay.orgin = complaint.orgin;
            //complaintDisplay.raw = complaint; state，0未处理,1处理中,2已处理,3已忽略
            let state = '';
            let objButtonShow = {}
            switch (complaint.state) {
                case 0:
                    state = '未处理';
                    objButtonShow = {
                        isSendShow: true,
                        isIgnoreShow: true
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);
                    console.log(complaintDisplay.raw);
                    //  {     isSendShow: true,     isIgnoreShow: false,     ...complaint }
                    break;
                case 1:
                    state = '处理中';

                    objButtonShow = {
                        isSendShow: false,
                        isIgnoreShow: false
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);
                    // complaintDisplay.raw = {     ...complaint,     isSendShow: false,
                    // isIgnoreShow: false }
                    break;
                case 2:
                    state = '已处理';
                    objButtonShow = {
                        isSendShow: false,
                        isIgnoreShow: false
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);
                    break;
                case 3:
                    state = '已忽略';
                    objButtonShow = {
                        isSendShow: false,
                        isIgnoreShow: false,
                        isReductionShow: true
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);

            }
            complaintDisplay.state = state;
            let subject : string = complaint.content['rewTitle'];
            if (!complaint.content['rewTitle']) 
                subject = complaint.content['rewContent'];
            complaintDisplay.subject = subject.length > 18
                ? subject.substr(0, 18) + '...'
                : subject;

            complaintsDisplayArr.push(complaintDisplay);
        });
        // console.log(complaintsDisplayArr);
        return complaintsDisplayArr;

    }

    getTitleSid(action) : void {
        if(action == 'all') {
            this.title = '全部列表';
            this.sid = '';
        } else if (action == 'notprocessed') {
            this.title = '未处理列表';
            this.sid = '0';

        } else if (action == 'processed') {
            this.title = '已处理列表';
            this.sid = '2';
        } else if (action == 'processing') {
            this.title = '处理中列表';
            this.sid = '1';
        } else if (action == 'ignored') {
            this.title = '已忽略列表';
            this.sid = '3';
        }

    }

    openRedmineDialog(raw) : void {
        let dialogRef = this
            .dialog
            .open(SendRedmineDialog);
        dialogRef.componentInstance.data = raw;
        dialogRef
            .afterClosed()
            .subscribe((data) => {
                if (data) {
                    if (data == 'ok') 
                        this.ngOnInit();
                    }
                });

    }
    openIgnoreDialog(raw) : void {
        let dialogRef = this
            .dialog
            .open(IgnoreDialog);
        dialogRef.componentInstance.data = raw;
        dialogRef
            .afterClosed()
            .subscribe(data => {
                if (data) {
                    if (data == 'ok') 
                        this.ngOnInit();
                    }
                });
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

    ngOnInit() : void {
        this
            .route
            .params
            .subscribe(params => {

                this.getTitleSid(params['action']);
                this.getComplaints(this.offset, this.limit);
            });

        //init search form
        this.orgins = this
            .redmineService
            .getRedmineEnumsArraybyName('orgin');
        this.apps = this
            .redmineService
            .getRedmineEnumsArraybyName('app');
    }
}
