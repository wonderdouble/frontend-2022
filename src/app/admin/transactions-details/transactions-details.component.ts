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
  selector: 'app-transactions-details',
  templateUrl: './transactions-details.component.html',
  styleUrls: ['./transactions-details.component.scss']
})
export class TransactionsDetailsComponent implements OnInit {

  subList:any = [];
  subAccount:any = [];
  subBalance:any = [];

  mySubscription: any;
  Register:any = [];

  isLoading: boolean = false;
  id: String;


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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTransactions();
  }

  getTransactions(){
    this.transactionsService.getTransactionsById(this.id).subscribe((data) => {
      this.subList = data;
      
      this.isLoading = true;
    })    
  }

  accept(){
    this.subList.status = "Confirmed";
    this.transactionsService.updateTransactions(this.subList).subscribe((data) => {
    
      const msg = {
        email: this.subList.email,
        topic: "Transaction Confirmed",
        message: "Please this is to inform you that the payment credited to Wongafix as monthly loan returns has been confirmed. Thanks"
      }

      

    });
  }

  decline(){
    this.subList.status = "Decline";
    this.transactionsService.updateTransactions(this.subList).subscribe((data) => {

      const msg = {
        email: this.subList.email,
        topic: "Transaction Declined",
        message: "Please this is to inform you that the payment credited to Wongafix as monthly loan returns is not successful. Please ensure yuou have enough money on your account as we try to make the automatic debit again"
      }

     
      
    });
  }

}
