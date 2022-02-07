import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  LoggedIn:boolean = false;
  username:any;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {

    this.auth.status().subscribe((res)=>{
      this.LoggedIn = res;
      console.log('loggedIn nav: '+ res);
      const localData:any = localStorage.getItem('user');
      if(localData){
        const userObj = JSON.parse(localData);
        this.username = userObj.name;
      }
    
    }, (err)=>{
      console.log(err);
    });

  }

}
