import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class UserService  {
  public responseAction: Observable<boolean>;

  constructor(public router: Router, public http: Http) {
  }

  register(fullName:string, email:string, password:string, bio:string){
    return responseAction;
  }

}
