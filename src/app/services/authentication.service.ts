import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

  //toggle Loggedin
  toggleLogin(state:boolean):void{
    this.isLoggedIn.next(state);
  }

  //Status
  status(){
    const localData:any = localStorage.getItem('user');

    if(!localData){
      this.isLoggedIn.next(false);
      console.log('User not logged in...');
    }else{
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
  
      if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
        console.log('User logged');
      } else {
        this.isLoggedIn.next(false);
        console.log('Token Expires!!');
      }

    }
    return this.isLoggedIn.asObservable();
  }

  login(email:string, password:string){
    return this.http.post('https://mcta.com/api/login',{
      email:email,
      password:password
    });
  }

  //user Info
  user(){
    const user:any = localStorage.getItem('user');
    const userObjet:any = JSON.parse(user);
    const token = userObjet.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('https://mcta.com/api/user',{headers: headers});
  }

  //Logout
  logout(allDevice:boolean){
    const user:any = localStorage.getItem('user');
    const userObjet:any = JSON.parse(user);
    const token = userObjet.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post('https://mcta.com/api/logout',{allDevice: allDevice}, {headers: headers});
  }

  //Register
  register(name:string, email:string, password:string, password_confirmation:string){
    const data = {
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post('https://mcta.com/api/register', data);
  }
}
