import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable } from "rxjs";
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { AuthService } from 'src/app/shared/auth.service';
import { BlogService } from 'src/app/shared/blog.service';
import { ToastrService } from 'ngx-toastr';
import { SubscribersService } from 'src/app/shared/subscribers.service';
import { PropertyService } from 'src/app/shared/property.service';
import { ArchiveService } from 'src/app/shared/archive.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  theMonth: String;
  mm: String;
  yy: number;
  monthNames:any = [];
  
  blogList:any = [];
  archiveList:any = [];
  subList:any = [];
  propList:any = [];

  pBlogList:any = [];
  pArchiveList:any = [];
  pSubList:any = [];
  pPropList:any = [];


  mySubscription: any;
  

  isBlog: boolean = false;
  isSub: boolean = false;
  isArchive: boolean = false;
  isProp: boolean = false;

  constructor(
    public blogService: BlogService,
    public archiveService: ArchiveService,
    public subService: SubscribersService,
    public propertyService: PropertyService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private datePipe: DatePipe
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
    this.getBlog();
    this.getProperty();
    this.getSubscriber();
    this.getArchive();

    const dd = new Date();
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.mm = this.monthNames[dd.getMonth()];
    this.yy = dd.getFullYear();

    this.theMonth = this.mm;
  }

  
  //Subscribers
  getBlog(){
    this.blogService.getBlog().subscribe((data) => {
      this.blogList = data;
      
      this.getLatestBlog();
    })    
  }

  getLatestBlog(){
    for (const sub of this.blogList) {
      const nday = new Date(sub.date);
      const m = this.monthNames[nday.getMonth()];
      const y = nday.getFullYear();

      if(this.mm === m && this.yy === y){
        this.pBlogList.push(sub);
      }
    }

    this.isBlog = true;
  }

  //Property
  getProperty(){
    this.propertyService.getProperty().subscribe((data) => {
      this.propList = data;
      
      this.getLatestProp();
    })    
  }

  getLatestProp(){
    for (const prop of this.propList) {
      const nday = new Date(prop.date);
      const m = this.monthNames[nday.getMonth()];
      const y = nday.getFullYear();

      if(this.mm === m && this.yy === y){
        this.pPropList.push(prop);
      }
    }

    this.isProp = true;
  }


  getSubscriber(){

    this.subService.getSubscribers().subscribe((data) => {
      this.subList = data;
      
      this.getLatestSub();
    })    
  }

  getLatestSub(){
    for (const sub of this.subList) {
      const nday = new Date(sub.date);
      const m = this.monthNames[nday.getMonth()];
      const y = nday.getFullYear();

      if(this.mm === m && this.yy === y){
        this.pSubList.push(sub);
      }
    }

    this.isSub = true;
  }

  getArchive(){

    this.archiveService.getArchive().subscribe((data) => {
      this.archiveList = data;
      
      this.getLatestArchive();
    })    
  }

  getLatestArchive(){
    for (const arc of this.archiveList) {
      const nday = new Date(arc.date);
      const m = this.monthNames[nday.getMonth()];
      const y = nday.getFullYear();

      if(this.mm === m && this.yy === y){
        this.pArchiveList.push(arc);
      }
    }

    this.isArchive = true;
  }


  fetchProp(id){
    this.router.navigate(['/admin/property/'+id]);
  }

  fetchBlog(id){
    this.router.navigate(['/admin/blog/'+id]);
  }

  fetchArchive(){
    this.router.navigate(['/admin/archive']);
  }

  fetchSub(){
    this.router.navigate(['/admin/subscriber']);
  }
}
