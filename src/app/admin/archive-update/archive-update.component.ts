import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable, of as observableOf } from "rxjs";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { ArchiveService } from 'src/app/shared/archive.service';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { Archive } from 'src/app/shared/archive.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-archive-update',
  templateUrl: './archive-update.component.html',
  styleUrls: ['./archive-update.component.scss']
})
export class ArchiveUpdateComponent implements OnInit {

  image = '';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  mySubscription: any;
  archiveList:any = [];
  id: String;

  isLoaded:Boolean = false; 

  constructor(
    public archiveService: ArchiveService,
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
    this.getArchiveById();
  }

  getArchiveById(){
    this.archiveService.getDetailsById(this.id).subscribe((data) => {
      this.archiveList= data;
      this.isLoaded = true;
      this.resetForm();
    })   
  }

  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }
    this.archiveService.formData = this.archiveList;
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
          localStorage.setItem("upload", data.Location);
          return true;
      });
    

    }
  }

  onSubmit(form: NgForm){
    const data = {   
      title: form.value.title,
      caption: form.value.caption.replace(/\r\n|\r|\n/g,"<br />"),
      uploader_email: this.archiveList.uploader_email,
      upload: this.archiveList.upload,
      date: this.archiveList.date
    }
    this.archiveService.updateArchive(data).subscribe((data: {}) => {
      //localStorage.setItem("reg_estate", form.value.estate);
      this.router.navigate(['/admin/archive']);
    })
  }


  deleteArchive(){
    this.archiveService.deleteArchive(this.id).subscribe((res) => {
      this.router.navigate(['/admin/archive']);
    });
  }
  
}
