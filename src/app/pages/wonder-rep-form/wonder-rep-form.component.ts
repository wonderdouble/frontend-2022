import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable, of as observableOf } from "rxjs";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { RepRegisterService } from 'src/app/shared/rep-register.service';
import { MailerService } from 'src/app/shared/mailer.service';

@Component({
  selector: 'app-wonder-rep-form',
  templateUrl: './wonder-rep-form.component.html',
  styleUrls: ['./wonder-rep-form.component.scss']
}) 
export class WonderRepFormComponent implements OnInit {

  image = '';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  mySubscription: any;
  RepRegister:any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public repRegisterService: RepRegisterService,
    public mailerService: MailerService) { 

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
    this.resetForm();
  }

  

  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }
    this.repRegisterService.formData = { 
      fullname: '',
      email: '',
      phone: '',
      gender: 'Select Gender',
      occupation: 'Select Category',
      address: '',
      username: '',
      upload: '',
      password: '',
      date: null
    }
  }

  uploadImage(event){

    const file = event.target.files[0];
    var dater = new Date();
    var mm = dater.getMinutes();
    var ss = dater.getSeconds();
    var hh = dater.getHours();

    const path = `agent/${hh}-${mm}-${ss}-${file.name}`;

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
    const unique = Math.floor((Math.random() * 9999) + 1000);
    const uname = form.value.username+"-"+unique;
    if (form.value.id == null){
      const data = { 
        fullname: form.value.fullame,
        email: form.value.email,
        phone: form.value.phone,
        gender: form.value.gender,
        occupation: form.value.occupation,
        address: form.value.address,
        username: uname,
        password: form.value.password,
        upload: localStorage.getItem("upload"),
        date: new Date
      }
      this.repRegisterService.createMember(data).subscribe((data: {}) => {
        
        this.router.navigate(['/wonder-representative-confirmation']);
      })
    }
  }

}
