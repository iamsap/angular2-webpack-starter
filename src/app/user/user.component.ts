import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {UserService} from '../services';

@Component({
  selector: 'user',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './user.component.scss'
  ],
  templateUrl: './user.component.html'
})
export class UserComponent {

  private sub:any;
  userId:string;
  user:any;

  constructor(private route: ActivatedRoute, private userService:UserService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.userService.getUserById(this.userId)
        .subscribe(
          user => this.onUserFound(user),
          error => this.onError(error)
        );
    });
  }

  onUserFound(user){
    this.user = user;
  }

  onError(err){

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

