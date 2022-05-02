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
  selector: 'app-property-update',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.scss']
})
export class PropertyUpdateComponent implements OnInit {
  
  image = '';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  id: String;
  propList:any = [];
  uploadList:any = [];

  mySubscription: any;
  isLoaded:Boolean = false;

  constructor(
    public propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    public uploadService: PropertyUploadService,
    public authService: AuthService,
    public toastrService: ToastrService
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
    this.getPropertyById();
  }

  getPropertyById(){
    this.propertyService.getPropertyById(this.id).subscribe((data) => {
      this.propList= data;

      this.getUploadProperty();
    })   
  }

  getUploadProperty(){
    this.uploadService.getUploadByPropertyId(this.id).subscribe((data) => {
      this.uploadList= data;
      this.isLoaded = true;
      this.resetForm();
      this.resetForm2();
    })   
  }

  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }
    this.propertyService.formData = this.propList;
    this.propertyService.formData.documentation = this.propList.documentation.replaceAll("<br>", " ");
    this.propertyService.formData.caption = this.propList.caption.replaceAll("<br>", " ");
    this.propertyService.formData.features = this.propList.features.replaceAll("<br>", " ");
  }

  resetForm2(form2?: NgForm){
    if (form2 != null){
      form2.resetForm();
    }

    this.uploadService.formData = {
      property_id:'',
      upload: '',
      caption: '',
      topic: ''
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

  onSubmitUpload(form2: NgForm){
    const data = {   
      property_id: this.id,
      topic: form2.value.topic,
      caption: form2.value.ucaption.replace(/\r\n|\r|\n/g,"<br />"),
      upload: localStorage.getItem("upload")
    }
    this.uploadService.createUpload(data).subscribe((data: {}) => {
      //localStorage.setItem("reg_estate", form.value.estate);
      this.toastrService.success("Successfully uploaded", "Confirmation");
      this.router.navigate(['/admin/property/'+this.id]);
    })
  }


  onSubmit(form: NgForm){
    const data = {   
      category: this.propList.category,
      estate: form.value.estate,
      caption: form.value.caption.replace(/\r\n|\r|\n/g,"<br>"),
      location: form.value.location,
      documentation: form.value.documentation.replace(/\r\n|\r|\n/g,"<br>"),
      features: form.value.features.replace(/\r\n|\r|\n/g,"<br>"),
      video: form.value.video,
      price: form.value.price,
      upload: this.propList.upload,
      status: this.propList.status,
      date: this.propList.date
    }
    this.propertyService.updateProperty(data).subscribe((data: {}) => {
      //localStorage.setItem("reg_estate", form.value.estate);
      this.toastrService.success("Successfully updated", "Confirmation");
      this.router.navigate(['/admin/property/'+this.id]);
    })
  }


  deleteUpload(){
    // var AWS = require('aws-sdk'); 

    // AWS.config = new AWS.Config();
    // AWS.config.accessKeyId = 'AKIAIXXQRM75QPKKRSNA';
    // AWS.config.secretAccessKey = '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';
    // AWS.config.region = "eu-west-1";

    // var s3 = new AWS.S3();

    // var fullPath = "";
    // var filename = fullPath.replace(/^.*[\\\/]/, '');
    // console.log(filename);

    // var params = {
    //   Bucket: 'wonderdouble-assets',
    //   Key: '1.png'
    // };

    // s3.deleteObject(params, function(err, data) {
    //     if (err) console.log(err)     
    //     else console.log("Successfully deleted myBucket/myKey");   
    // });

    this.uploadService.deleteUpload(this.id).subscribe((res) => {
      this.router.navigate(['/admin/property']);
    });
  }

}
