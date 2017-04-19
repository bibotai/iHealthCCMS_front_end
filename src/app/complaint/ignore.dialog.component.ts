import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RedmineService} from '../services/redmine.service';
import {defaultIgnoreReason} from '../config/app.config';
import {defaultFollowReason} from '../config/app.config';
@Component({selector: 'ignoredialog', templateUrl: './ignore.dialog.component.html'})
export class IgnoreDialog implements OnInit {
    constructor(@Optional()public dialog : MdDialog, public dialogRef : MdDialogRef < IgnoreDialog >, private redmineService : RedmineService,) {};
    defaultreason : any;
    selectreason : any;
    data : any;
    reason : string;
    disableButton : boolean = false;
    isIgnore : boolean = false;
    isFollowUp : boolean = false;
    ngOnInit() : void {
        this.data = this.dialogRef.componentInstance.data;
        if (this.data.ignoretype == 3) {
            this.isIgnore = true;
            this.defaultreason = defaultIgnoreReason;
        } else {
            this.isFollowUp = true;
            this.defaultreason = defaultFollowReason;
        }
    }

    ignore() : void {
        this.disableButton = true;
        this
            .redmineService
            .ignore(this.data._id, this.reason
                ? this.reason
                : this.selectreason, this.data.ignoretype)
            .then((data) => {
                this
                    .dialogRef
                    .close(data)
            });

    }

}
