import {Component, ElementRef} from '@angular/core';

import {AuthorizationService} from '../services/authorization.service'

@Component({selector: 'login-form', template: `
        <div class="container" >
            <div class="title">
                Welcome
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="input-field col s12">
                        <input  id="username" 
                            type="test" [(ngModel)]="username" class="validate">
                        <label for="username">username</label>
                    </div>
                </div>
 
                <div class="row">
                    <div class="input-field col s12">
                        <input  id="password" [(ngModel)]="password"
                            type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
 
                <span>{{errorMsg}}</span>
                <button (click)="login()" 
                    class="btn waves-effect waves-light" 
                    type="submit" name="action">Login</button>
            </div>
        </div>
    	`})

export class LoginComponent {
    username : string;
    password : string;
    constructor(private authorizationService : AuthorizationService) {}
    login() {
        this
            .authorizationService
            .userLogin(this.username, this.password)
            .then(data => {
                console.log(data);
            });
    }
}
