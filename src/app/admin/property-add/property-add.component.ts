import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable, of as observableOf } from "rxjs";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { PropertyService } from 'src/app/shared/property.service';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { Property } from 'src/app/shared/property.model';
import { AuthService } from 'src/app/shared/auth.service';
import { PropertyUploadService } from 'src/app/shared/property-upload.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.scss']
})
export class PropertyAddComponent implements OnInit {

  image = '';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  mySubscription: any;

  constructor(
    public propertyService: PropertyService,
    private router: Router,
    public uploadService: PropertyUploadService,
    public toastrService: ToastrService,
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
    this.resetForm();
  }

  // resetForm2(form2?: NgForm){
  //   if (form2 != null){
  //     form2.resetForm();
  //   }

  //   this.uploadService.formData = {
  //     property_id:'',
  //     upload: '',
  //     caption: '',
  //     topic: ''
  //   }
  // }

  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }

    this.propertyService.formData = {
      type:'',
      category:'',
      estate: '',
      caption: '',
      location: '',
      documentation: '',
      features: '',
      video: '',
      price: '',
      upload: '',
      status: '',
      date: null,
    }
  }

  uploadImage(event){

    const file = event.target.files[0];
    var dater = new Date();
    var mm = dater.getMinutes();
    var ss = dater.getSeconds();
    var hh = dater.getHours();

    const path = `property/${hh}-${mm}-${ss}-${file.name}`;

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
      type: "Top",
      category: form.value.category,
      estate: form.value.estate,
      caption: form.value.caption.replace(/\r\n|\r|\n/g,"<br>"),
      location: form.value.location,
      documentation: form.value.documentation.replace(/\r\n|\r|\n/g,"<br>"),
      features: form.value.features.replace(/\r\n|\r|\n/g,"<br>"),
      video: form.value.video,
      price: form.value.price,
      upload: localStorage.getItem("upload"),
      status: 'Active',
      date: new Date,
    }
    this.propertyService.createProperty(data).subscribe((res) => {
      //localStorage.setItem("reg_estate", form.value.estate);
      const datax = {   
        property_id: res.created.id,
        upload: localStorage.getItem("upload"),
        caption: '',
        topic: form.value.estate
      }
      this.uploadService.createUpload(datax).subscribe((res2: {}) => {
        this.toastrService.success("Property added", "Confirmation");
        this.router.navigate(['/admin/property/add']);
      })
      
    })
  }


}
