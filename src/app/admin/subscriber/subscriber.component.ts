import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { SubscribersService } from 'src/app/shared/subscribers.service';
import { Subscribers } from 'src/app/shared/subscribers.model';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit {

  subList:any = [];
  allSubList:any = [];
  mySubscription: any;
  pageOfItems: Array<any>; 

  filter: String = "All";
  searchInput: string;

  isLoaded: boolean = false; 

  constructor(
    private subService: SubscribersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.getAllSubcribersList();
  }

  getAllSubcribersList(){
    this.subService.getSubscribers().subscribe((data) => {
      this.allSubList = data;
      this.subList = data;

      this.isLoaded = true;
    })    
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
 

  getByInput(){
    this.isLoaded = false;
    let isNum = /^\d+$/.test(this.searchInput);
    let isEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.searchInput);

    if(this.searchInput == ''){
      this.subList = this.allSubList;
      this.isLoaded = true;
    }
    else if (isEmail){
      this.getEmail(this.searchInput);
    }
    else{
      this.getEstate(this.searchInput);
      //this.toastr.error("Email or 11 digit phone no required");
    }
  }

  getEmail(input){
    this.isLoaded = false;
    this.subList = [];
    for (let sub of this.allSubList){
      if (sub.email == input){
        this.subList.push(sub);
      }
    }
    this.filter = input;
    this.isLoaded = true;
  }

  getEstate(input){
    this.isLoaded = false;
    this.subList = [];
    for (let sub of this.allSubList){
      if (sub.estate == input){
        this.subList.push(sub);
      }
    }
    this.filter = input;
    this.isLoaded = true;
  }

 
}
