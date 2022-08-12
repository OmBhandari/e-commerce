import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isadmin = false;

  constructor() {
    if(localStorage.getItem("usertype") == "admin")
      this.isadmin = true;
   }

  ngOnInit(): void {

  }

  logout(){
    localStorage.clear();
    window.location.replace("../");
  }

}
