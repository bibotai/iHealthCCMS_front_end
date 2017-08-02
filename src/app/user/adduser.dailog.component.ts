import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {UserService} from '../services/user.service'
@Component({selector: 'adduserdialog', styleUrls: ['./adduser.dailog.component.css'], templateUrl: './adduser.dailog.component.html'})
export class AddUserDialog implements OnInit {
    constructor(@Optional()public dialog : MdDialog, public dialogRef : MdDialogRef < AddUserDialog >, private userServer : UserService) {};
    username : string;
    password : string;
    disableButton : boolean = false;
    ngOnInit() : void {}

    addUser() : void {
        this.disableButton = true;
        this
            .userServer
            .addUser(this.username, this.password)
            .then((data) => {
                console.log(data);
                this
                    .dialogRef
                    .close(data)

            });

    }

}