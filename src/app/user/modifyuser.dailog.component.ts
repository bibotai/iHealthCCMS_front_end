import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {UserService} from '../services/user.service'
@Component({selector: 'modifyuserdialog', styleUrls: ['./adduser.dailog.component.css'], templateUrl: './modifyuser.dailog.component.html'})
export class ModifyUserDialog implements OnInit {
    constructor(@Optional()public dialog : MdDialog, public dialogRef : MdDialogRef < ModifyUserDialog >, private userServer : UserService) {};
    password : string;
    disableButton : boolean = false;
    data : any;
    ngOnInit() : void {
        this.data = this.dialogRef.componentInstance.data;
    }

    addUser() : void {
        this.disableButton = true;
        this
            .userServer
            .modifyUser(this.data, this.password)
            .then((data) => {
                console.log(data);
                this
                    .dialogRef
                    .close(data)
            });

    }

}