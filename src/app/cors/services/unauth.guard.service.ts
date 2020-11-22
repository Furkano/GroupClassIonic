import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';

import { UserService } from './user.service';
import { take } from 'rxjs/operators';

@Injectable()
export class UnAuthGuard implements CanActivate {
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
       if(data==true){
           this.router.navigateByUrl("/");
       }
    });
    let data=  this.userService.isAuthenticated.pipe(take(1));
   
    return  data;

  }
}