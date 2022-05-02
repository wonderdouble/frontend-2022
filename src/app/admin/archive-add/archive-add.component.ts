import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable, of as observableOf } from "rxjs";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { Archive } from 'src/app/shared/archive.model';
import { AuthService } from 'src/app/shared/auth.service';
import { ArchiveService } from 'src/app/shared/archive.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archive-add',
  templateUrl: './archive-add.component.html',
  styleUrls: ['./archive-add.component.scss']
})
export class ArchiveAddComponent implements OnInit {

  image = '';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  email: String;

  mySubscription: any;

  constructor(
    public archiveService: ArchiveService,
    private router: Router,
    public authService: AuthService,
    public toastrService: ToastrService,
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
    this.email = user.email;
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }

    this.archiveService.formData = {
      title:'',
      category: 'Public',
      caption: '',
      uploader_email: '',
      upload: '',
      key: '',
      date: null,
    }
  }

  uploadImage(event){

    const file = event.target.files[0];
    var dater = new Date();
    var mm = dater.getMinutes();
    var ss = dater.getSeconds();
    var hh = dater.getHours();

    const path = `archive/${hh}-${mm}-${ss}-${file.name}`;

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
              return false;
          }
          localStorage.setItem("wonder_archive_upload", data.Location);
          return true;
      });
    

    }
  }

  onSubmit(form: NgForm){
    let key;
    if(form.value.category == 'Public'){
      key = "Nil";
    }
    else {
      key = '!DoublePass';
    }
    const data = {   
      category: form.value.category,
      title: form.value.title,
      caption: form.value.caption.replace(/\r\n|\r|\n/g,"<br>"),
      uploader_email: this.email,
      upload: localStorage.getItem("wonder_archive_upload"),
      key: key,
      date: new Date
    }
    this.archiveService.createArchive(data).subscribe((data: {}) => {
      //localStorage.setItem("reg_estate", form.value.estate);
      this.toastrService.success("File successfully uploaded", "Confirmation");
      this.router.navigate(['/admin/archive/add']);
    })
  }


}
