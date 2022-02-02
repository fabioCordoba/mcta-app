import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient) { }

  user:any;
  ngOnInit(): void {
    const user:any = localStorage.getItem('user');
    const userObjet = JSON.parse(user);
    const token = userObjet.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get('https://mcta.com/api/user',{headers: headers}).subscribe((res)=>{
      this.user = res;
    },(err)=>{
      console.log(err);
    });
  }

}
