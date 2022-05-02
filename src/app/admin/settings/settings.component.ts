import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  email: String;
  adminList:any = [];
  formTracker: boolean = false;

  isLoaded: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.checkLogin();
    var user = JSON.parse(localStorage.getItem('adminInfo'));
    this.email = user.email;
    
    this.getUser();
  }

  getUser(){
    this.authService.getByEmail(this.email).subscribe((data) => {
      this.adminList = data;
      this.isLoaded = true;
    })    
  }

  reset(cnewPass, confirm){
    this.formTracker = true;
    if (cnewPass !== confirm){
      this.toastrService.warning("Passwords don't match", "Error");
    }
    else {
      this.adminList.password = cnewPass;
      this.authService.updateAdmin(this.adminList).subscribe((data) => {
        this.toastrService.success("Password successfully reset", "Confirmation");
        this.router.navigate(['/admin/settings']);
      })    
    }
    
  }

}
