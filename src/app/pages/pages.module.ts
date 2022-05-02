import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { WonderRepPageComponent } from './wonder-rep-page/wonder-rep-page.component';
import { WonderRepFormComponent } from './wonder-rep-form/wonder-rep-form.component';
import { RepRegisterConfirmationComponent } from './rep-register-confirmation/rep-register-confirmation.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {path:'index', component:IndexComponent},
  {path:'contact', component:ContactComponent},
  {path:'about', component:AboutComponent},
  {path:'properties', component:ServicesComponent},
  {path:'blog', component:BlogComponent},
  {path:'blog/details/:id', component:BlogDetailsComponent},
  {path:'property/:id/:estate/:username', component:PropertyDetailsComponent},
  {path:'wonder-representative-page', component:WonderRepPageComponent},
  {path:'wonder-representative-form', component:WonderRepFormComponent},
  {path:'wonder-representative-confirmation', component:RepRegisterConfirmationComponent},
  {path:'contact', component:ContactComponent},
  {path:'privacy-policy', component:PrivacyPolicyComponent},
  {path:'loginpage', component:LoginpageComponent},
]

@NgModule({
  declarations: [FooterComponent, NavbarComponent, IndexComponent, AboutComponent, ServicesComponent,ContactComponent, BlogComponent, BlogDetailsComponent, PropertyDetailsComponent, WonderRepPageComponent, WonderRepFormComponent, RepRegisterConfirmationComponent, LoginpageComponent, PrivacyPolicyComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ]
})
export class PagesModule { }
