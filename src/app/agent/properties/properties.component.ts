import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { PropertyService } from 'src/app/shared/property.service';
import { Property } from 'src/app/shared/property.model';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  propList:any = [];
  mySubscription: any;
  isLoaded: boolean = false;

  constructor(
    public propertyService: PropertyService,
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
    this.getProperties();
  }

  getProperties(){
    this.propertyService.getProperty().subscribe((data) => {
      this.propList = data;
      this.isLoaded = true;
    })   
  }

}
