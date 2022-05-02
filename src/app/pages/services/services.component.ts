import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PropertyUploadService } from 'src/app/shared/property-upload.service';
import { PropertyService } from 'src/app/shared/property.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  mySubscription: any;
  username:string;
  houseList:any = [];
  House:any = [];
  HouseDetails :any = [];
  HouseUpload :any = [];
  isLoaded: Boolean = false;

  pageOfItems: Array<any>; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public houseUploadService: PropertyUploadService,
    public houseService: PropertyService,
    private metaService:Meta,
    private titleService:Title
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
    //localStorage.removeItem('wonderUsername');
    if(localStorage.getItem('wonderUsername') !== null){
      this.username = localStorage.getItem('wonderUsername');
    }
    else{
      this.username = 'self';
    }

    this.getHouse();
    
  }

  getHouse(){
    this.houseService.getProperty().subscribe((data) => {
      this.houseList = data;
      this.isLoaded = true;
    })    
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
