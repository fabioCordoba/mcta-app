import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthenticationService, private router:Router) { }

  user:any;
  ngOnInit(): void {
    
    this.auth.status().subscribe((res)=>{
      console.log('res Dash: '+res);
      if(res == false){
        this.router.navigate(['/login']);
      }else{
        this.auth.user().subscribe((res)=>{
          this.user = res;
        },(err)=>{
          console.log(err.error);
          if(err.error.error == "Unauthenticated."){
            localStorage.removeItem('user');
            this.auth.toggleLogin(false);
            this.router.navigate(['/']);
          }
        });

      }
    });

    
  }

}
