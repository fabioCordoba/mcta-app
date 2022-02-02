import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){

    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);
    this.http.post('https://mcta.com/api/login',{
      email:email,
      password:password
    }).subscribe((res:any)=>{
      localStorage.setItem('user',JSON.stringify(res));
      this.router.navigate(['/dashboard']);
    },
    err=>{
      console.log(err);
    });
  }

}
