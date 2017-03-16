//路由模块
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComplaintListComponent} from './complaint/complaint.list.component';
import {ComplaintDetail} from './complaint/complaint.detail.component'
const routes : Routes = [
    {
        path: '',
        redirectTo: '/complaintlist/notprocessed',
        pathMatch: 'full'
    }, {
        path: 'complaintlist/:action',
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