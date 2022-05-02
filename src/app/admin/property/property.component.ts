import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { PropertyService } from 'src/app/shared/property.service';
import { Property } from 'src/app/shared/property.model';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  houseList:any = [];
  pageOfItems: Array<any>;
  isLoaded: Boolean = false;

  constructor(
    private houseService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.getProperty();
  }

  getProperty(){
    this.houseService.getProperty().subscribe((data) => {
      this.houseList = data;

      this.isLoaded = true;
    })    
  }

  addProperty(){
    this.router.navigate(['/admin/property/add']);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  fetchProperty(id){
    this.router.navigate(['/admin/property/'+id]);
  }

}
