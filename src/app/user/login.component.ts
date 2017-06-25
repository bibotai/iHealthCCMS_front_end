import {Component, ElementRef} from '@angular/core';

import {AuthorizationService} from '../services/authorization.service'

@Component({selector: 'login-form', templateUrl: './login.component.html', styleUrls: ['./login.component.css']})

export class LoginComponent {
    username : string;
    password : string;
    constructor(private authorizationService : AuthorizationService) {}
    encrypt() {
        this
            .authorizationService
            .getAccessToken('58ddc7fce9a9b92dd142bd05', 'bb1')
            .then(data => console.log(data));
    }
    refresh() {
        // this     .authorizationService
        // .refreshAccessToken('58ddc7fce9a9b92dd142bd05',
        // '298d19cc638833c54fc2aab0e4f072e3')     .then(data => console.log(data));
    }
    login() {
        this
            .authorizationService
            .userLogin(this.username, this.password)
            .then(data => {
                console.log(data);
            });
    }
}
