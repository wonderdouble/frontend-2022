import { Component, OnInit } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable } from "rxjs";
import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from 'src/app/shared/transactions.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  subList:any = [];
  mySubscription: any;
  isLoaded:boolean = false;

  constructor(
    public transactionsService: TransactionsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private datePipe: DatePipe
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
    this.authService.checkLogin();
    this.getTransactions();
  }

  getTransactions(){
    this.transactionsService.getTransactions().subscribe((data) => {
      this.subList = data;
      this.isLoaded = true;
    })    
  }

  fetchDetails(id){
    this.router.navigate(['/admin/transaction/'+id]);
  }

}
