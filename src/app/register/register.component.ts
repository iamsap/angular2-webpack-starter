import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { UserService } from '../services';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'register',  // <register></register>
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./register.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent  {

  fullName:string;
  email:string;
  password:string;
  bio:string;
  isSubmitted:boolean;

  // TypeScript public modifiers
  constructor(private userService:UserService) {
  }

  register(){

  }

}
