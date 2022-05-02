import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { RepTransactionService } from 'src/app/shared/rep-transaction.service';
import { RepTransaction } from 'src/app/shared/rep-transaction.model';
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  isLoaded: boolean = false;
  transList:any = [];
  mySubscription: any;
  id: String;

  constructor(
    public transService: RepTransactionService,
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
    this.getTransactions();
  }

  getTransactions(){
    this.transService.getById(this.id).subscribe((data) => {
      this.transList = data;
      this.isLoaded = true;
    })   
  }

}
