import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  checkbox:boolean = false;
  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    console.log(this.checkbox);
    this.auth.logout(this.checkbox).subscribe((res)=>{
      console.log(res);
      localStorage.removeItem('user');
      this.auth.toggleLogin(false);
      this.router.navigate(['/']);
    },(err)=>{
      console.log(err);
    })
  }

}
