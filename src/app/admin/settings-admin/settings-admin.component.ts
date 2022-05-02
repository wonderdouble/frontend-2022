import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable } from "rxjs";
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MailerService } from 'src/app/shared/mailer.service';

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.component.html',
  styleUrls: ['./settings-admin.component.scss']
})
export class SettingsAdminComponent implements OnInit {

  mySubscription: any;
  Admin:any = [];
  formTracker: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastrService: ToastrService,
    public authService: AuthService,
    public mailerService: MailerService
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }
    this.authService.formData = { 
      email: '',
      password: '',
      name: '',
      phone: '',
      department: '',
      date: null
    }
  }

  onSubmit(form: NgForm){
    this.formTracker = true;
    form.value.email = form.value.email.toLowerCase();
    const unique = Math.round(Math.random() * (500 - 100) + 100);
    const pass = form.value.email+'-'+unique;
    
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmail =  re.test(form.value.email);

    let isnum = /^\d+$/.test(form.value.phone);

    if(form.value.department == 'Select Department'){
      this.toastrService.error("Select valid department", "Error");
    }
    else if(!isnum){
      this.toastrService.warning("Only digits required for phone number", "Error!");
    }
    else if (form.value.phone.length !== 11){
      this.toastrService.warning("Phone no must be 11 digits", "Error!")
    }
    else if (!isEmail){
      this.toastrService.warning("Invalid Email", "Error!")
    }
    else {
      const data = { 
        email: form.value.email,
        password: pass,
        name: form.value.name,
        phone: form.value.phone,
        department: form.value.department,
        date: new Date
      }
      this.authService.createAdmin(data).subscribe((datax: {}) => {

        this.toastrService.success("Account created successfully", "Confirmation");
          this.router.navigate(['/admin/settings/admin']);
        
        const msg = {
          email: data.email,
          topic: "Welcome to Wonder Double Admin",
          message: data.name+", <br><br>Congratulations!, You've been registered to the Wonderdouble Admin portal. You can login to the dashboard anytime with the following details:<br<br><br><strong>Email:</strong> "+data.email+"<br><strong>Password:</strong> "+data.password+"<br><br>You can reset your password when you login to the dashboard<br><br>Thank you<br>Technical"
        }
  
        this.mailerService.sendMail(msg).subscribe((data) => {
          this.toastrService.success("Account created successfully", "Confirmation");
          this.router.navigate(['/admin/settings/admin']);
        });

      })

    }
    
  }

}
