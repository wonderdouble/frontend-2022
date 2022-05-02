import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { BlogService } from 'src/app/shared/blog.service';
import { Blog } from 'src/app/shared/blog.model';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { SeoService } from 'src/app/shared/seo.service';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  mySubscription: any;
  blogList:any = [];

  // blog_id: string;
  // blog_topic: string;
  // blog_comment: string;
  // blog_upload: string;
  // Blog :any = [];

  id: string;
  author: string;
  topic: string;
  comment: string;
  upload: string;
  dater: string;
  date: Date;

  

  constructor(
    public blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private metaService:Meta,
    private titleService:Title
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        this.router.navigated = false;
      }
    });

  
    this.id= localStorage.getItem('blogId');
    this.topic= localStorage.getItem('blogTopic');
    this.upload= localStorage.getItem('blogUpload');
    this.comment= localStorage.getItem('blogComment');
    this.author= localStorage.getItem('blogAuthor');
    this.dater = localStorage.getItem('blogDate');

    this.date = new Date(this.dater);
  }

  ngOnInit(): void {
    
    this.getBlog()
    //this.getBlogDetails();

    //this.metaService.removeTag(`name: 'description'`)
    //this.metaService.updateTag({ name: 'description', content: this.blog_comment });
    this.metaService.updateTag(
      { name: 'description', content: this.comment }
    );

    this.titleService.setTitle(this.topic);
    this.metaService.updateTag({ property: 'og:title', content: this.topic});
    this.metaService.updateTag({ property: 'og:description', content: this.comment});
    this.metaService.updateTag({ property: 'og:url', content: "https://www.wonderdoubleglobal.com/blog/details/"+this.id });
    this.metaService.updateTag({ property: 'og:image:alt', content: this.topic });
    this.metaService.updateTag({ property: 'og:image', content: this.upload });

    /*this.metaService.addTag({ property: 'fb:pages', content: '444758540246461'});
    this.metaService.addTag({ property: 'og:type', content: 'article'});
    this.metaService.addTag({ property: 'og:site_name', content: 'https://www.wonderdoubleglobal.com'});*/
    //https://wonderdouble-assets.s3-eu-west-1.amazonaws.com/wonder1.png

    
  }

  // getBlogDetails(){
  //   console.log(this.blog_id);
  //   this.blogService.getDetailsById(this.blog_id).subscribe((data) => {
  //     this.Blog = data;

  //     this.author = data[0].author;  
  //     this.topic = data[0].topic;
  //     this.comment = data[0].comment;
  //     this.upload = data[0].upload;
  //     this.date = data[0].date;

  //   })    
  // }

  getBlog(){
    this.blogService.getBlogMin(12).subscribe((data) => {
      this.blogList = data;
    })    
  }

  redirect(id, topic, upload, comment){
    localStorage.setItem('blogId', id);
    localStorage.setItem('blogTopic', topic);
    localStorage.setItem('blogUpload', upload);
    localStorage.setItem('blogComment', comment);
    
    this.router.navigate(['/blog/details/'+id]);
  }

}
