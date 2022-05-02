import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { BlogService } from 'src/app/shared/blog.service';
import { Blog } from 'src/app/shared/blog.model'; 
import { SeoService } from 'src/app/shared/seo.service';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogList:any = [];
  Blog:any = []; 
  isLoaded: Boolean = false;
  pageOfItems: Array<any>; 

  constructor(
    public blogService: BlogService,
    private seoService: SeoService,
    private metaService:Meta,
    private titleService:Title,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.metaService.updateTag(
      { name: 'description', content: 'We are Registered Real Estate, Construction and Consulting Firm offering insightful services tailored towards helping individuals, corporate and Government agencies' }
    );
    
    this.titleService.setTitle('Wonder Double Global Solutions Limited is a Registered Real Estate and Construction Company');
    this.metaService.updateTag({ property: 'og:title', content: 'Wonder Double Global Solutions Limited is a Registered Real Estate and Construction Company' });
    this.metaService.updateTag({ property: 'og:description', content: 'We are Registered Real Estate, Construction and Consulting Firm offering insightful services tailored towards helping individuals, corporate and Government agencies' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://www.wonderdoubleglobal.com/blog' });
    this.metaService.updateTag({ property: 'og:image:alt', content: 'Wonder Double Global Solutions Limited Blog' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://wonderdouble-assets.s3-eu-west-1.amazonaws.com/wonder1.png' });
      //https://wonderdouble-assets.s3-eu-west-1.amazonaws.com/wonder1.png
  }

  getBlog(){
    this.blogService.getBlog().subscribe((data) => {
      this.blogList = data;
      this.isLoaded = true;
    })    
  }
/*
  getDate(date: Timestamp){    
    return this.datePipe.transform(new Date((date as Timestamp).seconds*1000), "dd-MM-yyyy");
  }
*/  

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
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
