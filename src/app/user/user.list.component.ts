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
import {DiaglogService} from '../services/diaglog.service';
import {UserService} from '../services/user.service';
import {AddUserDialog} from './adduser.dailog.component';
import {ModifyUserDialog} from './modifyuser.dailog.component'
import 'rxjs/add/operator/map';
//switchMap运算符
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
//弹出层
import {Observable} from 'rxjs/Observable';

@Component({selector: 'userlist', templateUrl: './user.list.component.html', styleUrls: ['./user.list.component.css']})

export class UserListComponent implements OnInit {

    content : any;
    constructor(private location : Location, private userService : UserService, private diaglog : MdDialog, private dialogService : DiaglogService) {}

    ngOnInit() : void {
        this
            .userService
            .getUserList()
            .then((data) => {
                this.content = data.content;
                console.log(data);
            });
    }

    openAddUserDialog() {
        let dialogRef = this
            .diaglog
            .open(AddUserDialog)
            .afterClosed()
            .subscribe(data => {
                if (data) {
                    if (data.success) {
                        this.ngOnInit();
                    }
                }
            })

    }
    openModifyUserDialog(data) {
        console.log(data);
        let dialogRef = this
            .diaglog
            .open(ModifyUserDialog);
        dialogRef.componentInstance.data = data;
        dialogRef
            .afterClosed()
            .subscribe(data => {
                if (data) {
                    if (data.success) {
                        this.ngOnInit();
                    }
                }
            })
    }
    openDeleteDialog(_id) {
        this
            .dialogService
            .confirm(this.diaglog, '确认删除', '确认删除吗？')
            .subscribe(res => {
                if (res) {
                    this
                        .userService
                        .deleteUser(_id);
                    this.ngOnInit();
                }
            });
    }

}