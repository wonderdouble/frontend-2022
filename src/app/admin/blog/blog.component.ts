import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable } from "rxjs";
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/shared/blog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  subList:any = [];
  mySubscription: any;
  pageOfItems: Array<any>; 

  isLoaded: boolean = false; 

  constructor(
    public blogService: BlogService,
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
    this.getAllBlog();
  }

  getAllBlog(){
    this.blogService.getBlog().subscribe((data) => {
      this.subList = data;
      this.isLoaded = true;
    })    
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  editBlog(id){
    this.router.navigate(['/admin/blog/'+id]);
  }

  addBlog(){
    this.router.navigate(['/admin/blog/add']);
  }

  


}
