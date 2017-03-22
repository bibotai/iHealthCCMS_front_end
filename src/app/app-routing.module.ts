//路由模块
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComplaintListComponent} from './complaint/complaint.list.component';
import {ComplaintDetail} from './complaint/complaint.detail.component'
const routes : Routes = [
    {
        path: '',
        redirectTo: '/complaintlist/notprocessed/1',
        pathMatch: 'full'
    }, {
        path: 'complaintlist/:action/:page',
        component: ComplaintListComponent
    }, {
        path: 'complaintdetail/:type/:id',
        component: ComplaintDetail
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}