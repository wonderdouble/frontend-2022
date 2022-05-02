import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { RepTrafficService } from 'src/app/shared/rep-traffic.service';
import { RepTraffic } from 'src/app/shared/rep-traffic.model';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {

  isLoaded: boolean = false;
  trafficList:any = [];
  mySubscription: any;
  id: String;

  constructor(
    public trafficService: RepTrafficService,
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTraffic();
  }

  getTraffic(){
    this.trafficService.getById(this.id).subscribe((data) => {
      this.trafficList = data;
      console.log(this.trafficList)
      this.isLoaded = true;
    })   
  }

}
