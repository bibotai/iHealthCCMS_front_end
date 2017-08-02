import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {appComponent} from './app.component';
import {HomeComponent} from './home.component'
import {ComplaintListComponent} from './complaint/complaint.list.component';
import {SendRedmineDialog} from './complaint/sendredmine.dialog.component';
import {IgnoreDialog} from './complaint/ignore.dialog.component'
import {ComplaintDetail} from './complaint/complaint.detail.component'
import {ComplaintService} from './services/complaint.service';
import {ComplaintListService} from './services/complaint.list.service';
import {RedmineService} from './services/redmine.service';

//DiaglogService
import {DiaglogService} from './services/diaglog.service';
//导入路由模块
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import 'hammerjs';
//Model-Driven Forms
import {ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {LoginComponent} from './user/login.component';
import {AuthorizationService} from './services/authorization.service';
import {HandleResult} from './util/handleresult';

import {UserComponent} from './user.component';
import {UserListComponent} from './user/user.list.component';
import {UserService} from './services/user.service';
import {AddUserDialog} from './user/adduser.dailog.component';
import {ModifyUserDialog} from './user/modifyuser.dailog.component';
import {ConfirmDialog} from './utilcomponent/confirmdialog.component'
// other imports
@NgModule({
  declarations: [
    appComponent,
    ComplaintListComponent,
    SendRedmineDialog,
    IgnoreDialog,
    ComplaintDetail,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    UserComponent,
    AddUserDialog,
    ModifyUserDialog,
    ConfirmDialog
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, AppRoutingModule, MaterialModule.forRoot(),
    NgxDatatableModule,
    RouterModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SendRedmineDialog,
    IgnoreDialog,
    AddUserDialog,
    ModifyUserDialog,
    ConfirmDialog,
    ConfirmDialog
  ],
  providers: [
    ComplaintService,
    ComplaintListService,
    DiaglogService,
    RedmineService, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthorizationService,
    HandleResult,
    UserService
  ],
  bootstrap: [appComponent]
})
export class AppModule {}