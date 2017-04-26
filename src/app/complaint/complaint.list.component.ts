import {Component, OnInit, Optional, ViewEncapsulation, ViewChild} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {ComplaintService} from '../services/complaint.service';
import {ComplaintListService} from '../services/complaint.list.service';
import {Complaint} from '../models/complaint';
import {ComplaintDisplay} from '../models/complaintdisplay';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Location} from '@angular/common';
import {redmineProjectIds} from '../config/app.config'
import {RedmineService} from '../services/redmine.service';
import 'rxjs/add/operator/map';
//switchMap运算符
import 'rxjs/add/operator/switchMap';
//弹出层
import {SendRedmineDialog} from './sendredmine.dialog.component';
import {IgnoreDialog} from './ignore.dialog.component';
@Component({selector: 'complaintlist', templateUrl: './complaint.list.component.html', encapsulation: ViewEncapsulation.None, styleUrls: ['./complaint.list.component.css']})

export class ComplaintListComponent implements OnInit {
    constructor(private complaintService : ComplaintService, private complaintListService : ComplaintListService, private redmineService : RedmineService, private route : ActivatedRoute, private router : Router, public dialog : MdDialog, private formbuilder : FormBuilder, private location : Location) {

        this.searchForm = this
            .formbuilder
            .group({orgin: '', app: '', keyword: ''});
    }
    @ViewChild('myTable')table : any;
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
    action : string;
    page : number = 0;
    querycondition : Object = {};
    spinnerShow : boolean = false;

    getComplaints(offset, limit, query = null) : void {
        this.spinnerShow = true;
        this
            .complaintService
            .getComplaints(limit, offset + 1, query)
            .then(complaints => this.complaints = complaints)
            .then(complaints => {
                console.log(complaints);
                this.complaintsDisplay = this
                    .complaintListService
                    .getComplaintsDisplay(complaints);
                this.loadingIndicator = false;
                // console.log(complaints);
                if (complaints.length == 0) {
                    this.isOverflow = true;
                    console.log('isOverflow!');
                } else {
                    this.isOverflow = false;
                }
                this.spinnerShow = false;

            });

    }

    onPageDown() : void {
        //Todo:这里有个bug
        console.log(this.isOverflow);
        if (!this.isOverflow) {
            this.offset++;
            this.page++;
            this.getQueryCondition();
            this.getComplaints(this.offset, this.limit, this.querycondition);
            this.replaceURL();

        }
    }

    onPageUp() {
        if (this.offset > 0) {
            this.offset--;
            this.page--;
            this.getQueryCondition();
            this.getComplaints(this.offset, this.limit, this.querycondition);
            this.replaceURL();
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
    openIgnoreDialog(raw, type) : void {
        let dialogRef = this
            .dialog
            .open(IgnoreDialog);
        dialogRef.componentInstance.data = Object.assign(raw, {ignoretype: type});
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

    getQueryCondition() : void {
        this.querycondition = {};
        if (this.sid) {
            Object.assign(this.querycondition, {"state": this.sid});
        }
        if (this.searchForm.value.orgin) {
            Object.assign(this.querycondition, {"orgin": this.searchForm.value.orgin});
        }
        if (this.searchForm.value.app) {
            Object.assign(this.querycondition, {"appName": this.searchForm.value.app});
        }
        if (this.searchForm.value.keyword) {
            let qs = new RegExp(this.searchForm.value.keyword, 'i');
            Object.assign(this.querycondition, {
                $or: [
                    {
                        "content.rewTitle": {
                            "$regex": qs
                        }
                    }, {
                        "content.rewContent": {
                            "$regex": qs
                        }
                    }, {
                        "content.authorName": {
                            "$regex": qs
                        }
                    }, {
                        "content.tranContent": {
                            "$regex": qs
                        }
                    }, {
                        "content.tranContentZh": {
                            "$regex": qs
                        }
                    }
                ]
            });
        }
        console.log(JSON.stringify(this.querycondition));
    }

    search() : void {
        this.getQueryCondition();

        this.getComplaints(0, 10, this.querycondition);
        console.log(this.querycondition);
        this.replaceURL(true);
    };

    replaceURL(isSearch : boolean = false) : void {
        if(isSearch) {
            this.page = 1;
        }
        let queryParams = {
            page: this.page
        };

        if (this.querycondition['orgin']) {
            Object.assign(queryParams, {"orgin": this.querycondition['orgin']});
        }
        if (this.querycondition['appName']) {
            Object.assign(queryParams, {"appname": this.querycondition['appName']});
        }
        this
            .router
            .navigate([`/complaintlist/${this.action}`], {queryParams});
        // this     .location     .replaceState(showUrl);
    }
    refreshRedmine() : void {
        this.spinnerShow = true;
        // this     .redmineService     .getRedmineState(redmineProjectIds.appstore)
        // .then(data =>
        // this.redmineService.getRedmineState(redmineProjectIds.fda).then(data =>
        // this.redmineService.getRedmineState(redmineProjectIds.googleplay).then(data
        // => this.spinnerShow = false)));
    }

    ngOnInit() : void {

        this
            .route
            .params
            .subscribe(params => {
                this.action = params['action'];

                let titleSid = this
                    .complaintListService
                    .getTitleSid(params['action']);
                this.title = titleSid['title'];
                this.sid = titleSid['sid'];

            });

        this
            .route
            .queryParams
            .subscribe(params => {
                this.page = Number(params['page']);
                this.offset = this.page - 1;
                let orgin = '';
                let appname = '';
                //初始化查询form
                if (params['orgin']) {
                    orgin = params['orgin'];
                }
                if (params['appname']) {
                    appname = params['appname'];
                }
                this.searchForm = this
                    .formbuilder
                    .group({orgin: orgin, app: appname});

                this.getQueryCondition();
                this.getComplaints(this.offset, this.limit, this.querycondition);
            });

        //init search form
        let objSelectObject: SelectObject = new SelectObject();

        let orginsarray: Array < SelectObject >= [];
        objSelectObject.value = '';
        objSelectObject.viewValue = '全部';
        orginsarray.push(objSelectObject);
        this
            .redmineService
            .getRedmineEnumsArraybyName('orgin')
            .forEach(item => {
                orginsarray.push(item);
            });
        this.orgins = orginsarray;
        let appsarray: Array < SelectObject >= [];
        appsarray.push(objSelectObject);
        this
            .redmineService
            .getRedmineEnumsArraybyName('app')
            .forEach(item => {
                appsarray.push(item);
            });
        this.apps = appsarray;
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this
            .table
            .rowDetail
            .toggleExpandRow(row);
    }
    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }
}
class SelectObject {
    value : string;
    viewValue : string;
}