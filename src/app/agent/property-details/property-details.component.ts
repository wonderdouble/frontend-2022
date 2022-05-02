import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { PropertyService } from 'src/app/shared/property.service';
import { PropertyUploadService } from 'src/app/shared/property-upload.service';
import { PropertyUpload } from 'src/app/shared/property-upload.model';
import { Property } from 'src/app/shared/property.model';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { SubscribersService } from 'src/app/shared/subscribers.service';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  username: String;
  estate_name: String;
  id: String;
  propList: any = [];
  uploadList: any = [];
  mySubscription: any;
  isLoaded:boolean = false;
  isBanner:boolean = false;

  constructor(
    public propertyUploadService: PropertyUploadService,
    public propertyService: PropertyService,
    public subscribersService: SubscribersService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService:Meta,
    private titleService:Title,
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
    const agent = JSON.parse(localStorage.getItem('agentInfo'));
    this.username = "seke"//agent.username;

    this.estate_name = this.route.snapshot.paramMap.get('estate');
    this.id = this.route.snapshot.paramMap.get('id');

    this.readProperty(this.id);
  } 

  readProperty(id){
    this.propertyService.getPropertyById(id).subscribe((data) => {
      this.propList = data;
      this.isLoaded = true;
      this.readPropertyUpload();
    })    
  }

  readPropertyUpload(){
    this.propertyUploadService.getUploadByPropertyId(this.id).subscribe((data) => {
      this.uploadList = data; 
      this.isBanner = true;
    }) 
  }

}
