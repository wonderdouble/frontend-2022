import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { DatePipe } from '@angular/common';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  mySubscription: any;
  
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
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
    
  }

}
