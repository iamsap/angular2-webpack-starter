import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { AppState } from '../app.service';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent  {
  // Set our default values
  public localState = {value: ''};
  // TypeScript public modifiers
  constructor(public appState:AppState) {
  }

}
