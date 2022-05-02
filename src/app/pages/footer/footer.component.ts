import { Component, OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/shared/newsletter.service';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Routes, Router, NavigationEnd } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public newsletterService: NewsletterService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
  }

  newsSubmit(femail: String){
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (femail == ''){

    }
    else if (!femail.match(mailformat)){
      this.toastr.success("Please write a valid email");
    }
    else {
      const data = {
        email: femail,
        date: new Date()
      }
      this.newsletterService.create(data)
        .subscribe((result) => {
          this.toastr.success("Subscription successful", "Confirmation");
          
        }
      );
    }
    
  }
  
}
