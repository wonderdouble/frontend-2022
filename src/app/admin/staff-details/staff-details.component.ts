import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable } from "rxjs";
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/shared/staff.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent implements OnInit {

  subList:any = [];
  mySubscription: any;
  pageOfItems: Array<any>; 

  id: String;

  isLoaded: boolean = false; 

  constructor(
    public staffService: StaffService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getStaffById();
  }

  getStaffById(){
    this.staffService.getStaffById(this.id).subscribe((data) => {
      this.subList = data;
      this.isLoaded = true;
    })    
  }

}
