import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';

import { DatePipe, CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AgentModule } from './agent/agent.module';


const routes: Routes = [
  {path:'', redirectTo:'/index', pathMatch:'full'},
  {path:'pages', loadChildren: './pages/pages.module#PagesModule'},
  {path:'admin', loadChildren: './admin/admin.module#AdminModule'}
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes),
    SharedModule,
    PagesModule,
    AdminModule,
    ToastrModule.forRoot(),
    AgentModule
  ],
  providers: [DatePipe, Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
