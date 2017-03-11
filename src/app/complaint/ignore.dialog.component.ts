import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RedmineService} from '../services/redmine.service';
@Component({selector: 'ignoredialog', templateUrl: './ignore.dialog.component.html'})
export class IgnoreDialog implements OnInit {
    constructor(@Optional()public dialog : MdDialog, public dialogRef : MdDialogRef < IgnoreDialog >, private redmineService : RedmineService,) {};

    data : any;
    reason : string;
    ngOnInit() : void {
        this.data = this.dialogRef.componentInstance.data;
    }

    ignore() : void {

        this
            .redmineService
            .ignore(this.data._id, this.reason)
            .then((data) => {
                this
                    .dialogRef
                    .close(data)
            });

    }

}
