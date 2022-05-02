import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(email: String, password: String){
    const data = {
      email: email,
      password: password
    } 
    this.authService.login(data)
      .subscribe((result) => {
        if (result.token == 'Nil'){
          this.toastr.error(result.status, "Confirmation");
        }
        else {
          localStorage.setItem('adminToken', result.token);
          localStorage.setItem('adminInfo', JSON.stringify(result.user));
          this.router.navigate(['/admin/dashboard']);
        }
        
      }
    );
  }

}
