import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';

import { take } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    user;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean> {

    this.userService.isAuthenticated.pipe(take(1)).subscribe(data=>{
       if(data==false){
           this.router.navigateByUrl("/login");
       }
    });
    let data=  this.userService.isAuthenticated.pipe(take(1));
   
    return  data;

  }
}