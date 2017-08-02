import {Component, Optional, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {RouterModule} from '@angular/router';
import {AuthorizationService} from './services/authorization.service'
@Component({selector: 'home', templateUrl: './user.component.html', styleUrls: ['./home.component.css']})
export class UserComponent implements OnInit {
    constructor(private authorizationService : AuthorizationService) {}
    private username : string;
    ngOnInit() : void {
        this
            .authorizationService
            .checkCredentials();
        this.username = localStorage.getItem("username");
    }
    logout() {
        this
            .authorizationService
            .logout();
    }
}