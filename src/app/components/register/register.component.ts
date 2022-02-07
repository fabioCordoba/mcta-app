import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors = {
    name:null,
    email:null,
    password:null,

  };
  constructor(private router:Router, private auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  onSumbit(form:NgForm){
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;

    this.auth.register(name,email,password,password_confirmation).subscribe((res)=>{
      localStorage.setItem('user',JSON.stringify(res));
      this.router.navigate(['/dashboard']);
      console.log(res);
    }, (err)=>{
      this.errors = err.error.errors
      //console.log(err.error.errors);
    });

  }

}
