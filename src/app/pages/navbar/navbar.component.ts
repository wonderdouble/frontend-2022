import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;

  constructor() {
    this.checkLogin();
   }

  ngOnInit(): void {
    
  }

  checkLogin(){
    const agent = JSON.parse(localStorage.getItem('agentInfo'));
    if (agent !== null){
      console.log("login")
      this.isLogin = true;
    }
  }


}
