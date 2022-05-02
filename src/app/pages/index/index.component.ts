import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { PropertyService } from 'src/app/shared/property.service';
import { PropertyUploadService } from 'src/app/shared/property-upload.service';
import { PropertyUpload } from 'src/app/shared/property-upload.model';
import { Property } from 'src/app/shared/property.model'; 
import { DatePipe } from '@angular/common';

import { BlogService } from 'src/app/shared/blog.service';
import { Blog } from 'src/app/shared/blog.model'; 
import { SeoService } from 'src/app/shared/seo.service';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  username:string;
  houseList:any = [];
  House:any = [];
  HouseDetails :any = [];
  HouseUpload :any = [];
  
  blogList:any = [];
  Blog:any = [];

  isHouse:Boolean = false;
  isBlog:Boolean = false;

  mySubscription: any;

  constructor(
    public houseUploadService: PropertyUploadService,
    public houseService: PropertyService,
    public blogService: BlogService,
    private seoService: SeoService,
    private metaService:Meta,
    private titleService:Title,
    private router: Router,
    public route: ActivatedRoute,
    private datePipe: DatePipe,
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

    if(localStorage.getItem('wonderUsername') !== null){
      this.username = localStorage.getItem('wonderUsername');
    }
    else{
      this.username = 'self';
    }
  }

  ngOnInit(): void {
    this.getHouseMin();
    this.getBlogMin();
  }

  getHouseMin(){
    this.houseService.getPropertyMin(6).subscribe((data) => {
      this.houseList = data;
      this.isHouse = true;
    })    
  }

  getBlogMin(){
    this.blogService.getBlogMin(6).subscribe((data) => {
      this.blogList = data;
      this.isBlog = true;
    })    
  }

  getPropMin(){
    this.houseService.getPropertyMin(1).subscribe((data) => {
      this.houseList = data;
      this.isHouse = true;
    })    
  }

  // redirect(id, topic, upload){
  //   upload = upload.substring(upload.lastIndexOf('/')+1);

  //   this.router.navigate(['/blog/'+id+'/'+topic+'/'+upload]);
  // }

  // redirectProp(id, estate, upload){
  //   upload = upload.substring(upload.lastIndexOf('/')+1);

  //   this.router.navigate(['/property/'+id+'/'+estate+'/'+upload]);
  // }

  getURL(){
    return "https://twitter.com/intent/tweet?source=tweetbutton&text=this.name&url=https://stage.mutterfly.in+this.url";
 }

 redirect(id, topic, upload, comment, author, date){
  localStorage.setItem('blogId', id);
  localStorage.setItem('blogTopic', topic);
  localStorage.setItem('blogUpload', upload);
  localStorage.setItem('blogComment', comment);
  localStorage.setItem('blogAuthor', author);
  localStorage.setItem('blogDate', date);
  
  this.router.navigate(['/blog/details/'+id]);
 }
}
