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
import { RepTrafficService } from 'src/app/shared/rep-traffic.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  estate_name: String;
  agent: String;
  id: String;
  banner: String = '';
  _album:any;
  featArr: any;
  mySubscription: any;
  isBanner: Boolean = false;
  username: string;
 
  trafficList:any = [];
  propList:any = [];
  sideList :any = [];
  uploadList :any = [];
  // HouseDetails :any = [];
  otherPropList:any = [];


  constructor(
    public propertyUploadService: PropertyUploadService,
    public propertyService: PropertyService,
    private trafficService: RepTrafficService,
    public subscribersService: SubscribersService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService:Meta,
    private titleService:Title,
    private _lightbox: Lightbox
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
    
    // const agent = JSON.parse(localStorage.getItem('agentInfo'));
    // this.username = agent.username;

    this.estate_name = this.route.snapshot.paramMap.get('estate');
    this.id = this.route.snapshot.paramMap.get('id');
    this.username = this.route.snapshot.paramMap.get('username');
    
    localStorage.setItem('wonderUsername', this.username);

    this.readProperty(this.id);
    this.readPropertyUpload();
    this.otherProperties(this.id);
    this.checkTraffic();
    
  }

  ngOnInit(): void {
    //this.getProperty();

    this.metaService.removeTag(`name: 'description'`)
    this.metaService.updateTag({ name: 'description', content: 'We are Registered Real Estate, Construction and Consulting Firm offering insightful services tailored towards helping individuals, corporate and Government agencies' });
    this.titleService.setTitle('Wonder Double Global Solutions Limited is a Registered Real Estate and Construction Company');
    this.metaService.updateTag({ property: 'og:title', content: 'Wonder Double Global Solutions Limited is a Registered Real Estate and Construction Company' });
    this.metaService.updateTag({ property: 'og:description', content: 'We are Registered Real Estate, Construction and Consulting Firm offering insightful services tailored towards helping individuals, corporate and Government agencies' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://www.wonderdoubleglobal.com/properties' });
    this.metaService.updateTag({ property: 'og:image:alt', content: 'Wonder Double Global Solutions Limited' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://wonderdouble-assets.s3-eu-west-1.amazonaws.com/wonder1.png' });
    //https://wonderdouble-assets.s3-eu-west-1.amazonaws.com/wonder1.png
  }

  checkTraffic(){
    //localStorage.removeItem('traffic_time');
    let tdater = localStorage.getItem('traffic_time');
    if (tdater !== null){
      
      //const tdate = Date.parse(tdater);
      //var tdate = new Date(parseInt(tdater, 10));
      //tdater = Date.parse(tdater);
      const tdate = parseInt(tdater);
      const date = new Date().getTime();

      // console.log("Tdate: "+tdate)
      // console.log("date: "+date)

      
      var seconds = Math.floor((date - tdate) / 1000);
      const interval = seconds / 60;

      console.log("interval: "+interval)
      if (interval > 29) {
        const ddate = new Date();
        this.trafficService.getByDate(ddate).subscribe((data) => {
          this.trafficList = data;
          localStorage.setItem('traffic_time', ''+ddate.getTime());

          this.setTraffic();
        })    
      }
    }
    else {
      const ddate = new Date();
      this.trafficService.getByDate(ddate).subscribe((data) => {
        this.trafficList = data;
        localStorage.setItem('traffic_time', ''+ddate.getTime());
        this.setTraffic();
      })    
    }
  }

  setTraffic(){
    if(this.trafficList.length < 1){
      const traffic = {
        username: this.username,
        property: this.estate_name,
        traffic:  1,
        date: new Date()
      }
      this.trafficService.createTraffic(traffic).subscribe((data) => {
        
      });
    }
    else {
      this.trafficList.traffic += 1;
      this.trafficService.updateTraffic(this.trafficList).subscribe((data) => {
        
      })   
    }
  }

  readProperty(id){
    this.propertyService.getPropertyById(id).subscribe((data) => {
      this.propList = data;

      let feat = this.propList.features;
      this.featArr = feat.split("<br>")
    })    
  }

  otherProperties(id){
    this.propertyService.getPropertyMin(4).subscribe((data) => {
      this.otherPropList = data;
    })    
    // this.propertyService.getProperty().subscribe((data) => {
      
    //   data.forEach(element => {
        
    //     if(element.id !== id){
    //       console.log(element);
    //     }
    //   });
    // })   
  }

  readPropertyUpload(){
    this.propertyUploadService.getUploadByPropertyId(this.id).subscribe((data) => {
      this.uploadList = data; 
      const album = {
        src: this.uploadList.upload,
        caption: this.uploadList.topic,
        thumb: this.uploadList.upload
     };

     this._album.push(album);
     this.isBanner = true;
    }) 
  }

  // getProperty(){
  //   this.propertyService.getPropertyMin().subscribe((data) => {
  //     this.sideList = data; 
  //   })    
  // }

  subscriber(name, phone, email){
    const data = {
      estate: this.estate_name,
      name: name,
      phone: phone,
      email: email,
      status: "Pending",
      date: new Date()
    }

    this.subscribersService.createSubscriber(data)
      .subscribe((result) => {
        this.toastr.success("Details submitted!", "Confirmation");
        this.router.navigate(['/property/'+this.id+'/'+this.estate_name+'/'+this.username]);
      }
    );
  }


  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
