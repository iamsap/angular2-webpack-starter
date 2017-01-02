import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class UserService  {
  public responseAction: Observable<boolean>;

  constructor(public router: Router, public http: Http) {
  }

  register(fullName:string, email:string, password:string, bio:string){

    var userObj = {
      fullName:fullName,
      email:email,
      password:password,
      bio:bio
    };

    return this.http.post(BRAINPAIDAPI + '/api/user/new', userObj )
    .map(this.extractData);
  }

  getUserById(userId:string){
    return this.http.get(BRAINPAIDAPI + '/api/user/' + userId)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || null;
  }

}
