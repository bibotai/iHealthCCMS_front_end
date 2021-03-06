//路由模块
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComplaintListComponent} from './complaint/complaint.list.component';
import {ComplaintDetail} from './complaint/complaint.detail.component';
import {LoginComponent} from './user/login.component';
import {HomeComponent} from './home.component';
import {UserListComponent} from './user/user.list.component';
import {UserComponent} from './user.component';
const routes : Routes = [
    {

        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, {
        path: 'login',
        component: LoginComponent
    }, {

        path: 'complaintlist',
        component: HomeComponent,
        children: [
            {

                path: '',
                redirectTo: 'notprocessed?page=1',
                pathMatch: 'full'
            }, {
                path: ':action',
                component: ComplaintListComponent
            }, {
                path: ':action/:page/:orgin/:appname',
                component: ComplaintListComponent
            }, {
                path: 'complaintdetail/:type/:id',
                component: ComplaintDetail
            }
        ]
    }, {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: '',
                redirectTo: 'userlist?page=1',
                pathMatch: 'full'
            }, {
                path: 'userlist',
                component: UserListComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}