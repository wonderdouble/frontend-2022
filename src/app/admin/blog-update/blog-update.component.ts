import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable, of as observableOf } from "rxjs";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { BlogService } from 'src/app/shared/blog.service';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { Blog } from 'src/app/shared/blog.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({ 
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.scss']
})
export class BlogUpdateComponent implements OnInit {

  image = '';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  mySubscription: any;
  blogList:any = [];
  id: String;

  isLoaded:Boolean = false; 

  constructor(
    public blogService: BlogService,
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
    this.getBlogById();
  }

  getBlogById(){
    this.blogService.getDetailsById(this.id).subscribe((data) => {
      this.blogList= data;
      this.isLoaded = true;
      this.resetForm();
    })   
  }

  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }
    this.blogService.formData = this.blogList;
  }

  uploadImage(event){

    const file = event.target.files[0];
    var dater = new Date();
    var mm = dater.getMinutes();
    var ss = dater.getSeconds();
    var hh = dater.getHours();

    const path = `blog/${hh}-${mm}-${ss}-${file.name}`;

    if(file.type.split('/')[0] !== 'image'){
      return alert ("Only images allowed");
    }
    else{
      const contentType = file.type;
      const bucket = new S3(
          {
            accessKeyId: 'AKIAIXXQRM75QPKKRSNA', 
            secretAccessKey: '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', 
          }
      );

      const params = {
        Bucket: 'wonderdouble-assets',
        Key: path,//this.FOLDER + file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };

      
      bucket.upload(params).on('httpUploadProgress', (evt) => {
        this.uploadPercent = observableOf(Math.round((evt.loaded / evt.total) * 100));
      }).send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          //this.uploadPercent = null;
          //this.image = data.Location;
          localStorage.setItem("upload", data.Location);
          return true;
      });
    

    }
  }

  onSubmit(form: NgForm){
    const data = {   
      author: form.value.author,
      topic: form.value.topic,
      comment: form.value.comment,
      upload: localStorage.getItem("upload"),
      date: new Date
    }
    this.blogService.updateBlog(data).subscribe((data: {}) => {
      //localStorage.setItem("reg_estate", form.value.estate);
      this.router.navigate(['/admin/blog']);
    })
  }


  deleteBlog(){
    this.blogService.deleteBlog(this.id).subscribe((res) => {
      this.router.navigate(['/admin/blog']);
    });
  }
  
}
