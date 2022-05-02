import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable } from "rxjs";
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ArchiveService } from 'src/app/shared/archive.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  subList:any = [];
  mySubscription: any;
  pageOfItems: Array<any>; 
  department: String;

  isLoaded: boolean = false; 

  constructor(
    public archiveService: ArchiveService,
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
    var user = JSON.parse(localStorage.getItem('adminInfo'));
    this.department = user.department;
    this.getAllArchive();
  }

  getAllArchive(){
    this.archiveService.getArchive().subscribe((data) => {
      this.subList = data;
      this.isLoaded = true;
    })    
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  editArchive(id){
    this.router.navigate(['/admin/archive/'+id]);
  }

  addArchive(){
    this.router.navigate(['/admin/archive/add']);
  }
}
