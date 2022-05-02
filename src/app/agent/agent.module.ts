import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertiesComponent } from './properties/properties.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path:'agent', component:PropertiesComponent},
  {path:'agent/profile', component:ProfileComponent},
  {path:'agent/property/:id', component:PropertyDetailsComponent},
  {path:'agent/traffic/:id', component:TrafficComponent},
  {path:'agent/transaction/:id', component:TransactionComponent},
]

@NgModule({
  declarations: [DashboardComponent, PropertiesComponent, ProfileComponent, NavbarComponent, PropertyDetailsComponent, TrafficComponent, TransactionComponent, FooterComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AgentModule { }
