import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { PropertyComponent } from './property/property.component';
import { ArchiveComponent } from './archive/archive.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PropertyUpdateComponent } from './property-update/property-update.component';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SettingsComponent } from './settings/settings.component';
import { ArchiveUpdateComponent } from './archive-update/archive-update.component';
import { ArchiveAddComponent } from './archive-add/archive-add.component';
import { SettingsAdminComponent } from './settings-admin/settings-admin.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { StaffComponent } from './staff/staff.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';


const routes: Routes = [
  {path:'admin', component:LoginpageComponent},
  {path:'admin/dashboard', component:DashboardComponent},
  {path:'admin/blog', component:BlogComponent},
  {path:'admin/blog/add', component:BlogAddComponent},
  {path:'admin/blog/:id', component:BlogUpdateComponent },

  {path:'admin/property', component:PropertyComponent},
  {path:'admin/property/add', component:PropertyAddComponent},
  {path:'admin/property/:id', component:PropertyUpdateComponent },

  {path:'admin/archive', component:ArchiveComponent},
  {path:'admin/archive/add', component:ArchiveAddComponent},
  {path:'admin/archive/:id', component:ArchiveUpdateComponent },

  {path:'admin/transactions', component:TransactionsComponent},
  {path:'admin/transaction/:id', component:TransactionsDetailsComponent },
  {path:'admin/login', component: LoginpageComponent },
  {path:'admin/settings', component: SettingsComponent },
  {path:'admin/settings/admin', component: SettingsAdminComponent },

  {path:'admin/subscriber', component: SubscriberComponent },
  {path:'admin/staff', component: StaffComponent },
  {path:'admin/staff/:id', component: StaffDetailsComponent },
]

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    TransactionsComponent,
    TransactionsDetailsComponent,
    LoginpageComponent,
    SettingsComponent,
    BlogComponent,
    PropertyComponent,
    TransactionsComponent,
    ArchiveComponent,
    BlogAddComponent,
    BlogUpdateComponent,
    PropertyAddComponent,
    PropertyUpdateComponent,
    ArchiveUpdateComponent,
    ArchiveAddComponent,
    SettingsAdminComponent,
    SubscriberComponent,
    StaffComponent,
    StaffDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
