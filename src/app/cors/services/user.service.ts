import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs';


import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '..//models/user.model';
import { HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { Filter } from '../models/filter.model';
;
import { RegisterDto } from '../Dto/registerDto.model';
import { UserDto } from '../Dto/userDto.model';
import { RePasswordDTO } from '../Dto/re-passwordDto';
import { LoginModel } from '../models/login.model';
import { BaseResponseDto } from '../Dto/responce.model.dto';

  
@Injectable() 
export class UserService {
  currentUserSubject = new BehaviorSubject<UserDto>({} as UserDto);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
 
    private jwtService: JwtService
  ) {}

  populate() {
 
    if (this.jwtService.getToken()) {
      this.apiService.get('/users')
      .subscribe(
        
        data => {
          console.log(data)
          this.setAuth({user:data["data"],token:this.jwtService.getToken()});
        },
        err => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  setUser(user:UserDto){
    this.currentUserSubject.next(user);
  }

  setAuth(user: any) {
    this.jwtService.saveToken(user["token"]);
    this.currentUserSubject.next(user["user"]);
    this.isAuthenticatedSubject.next(true);
  
  }

  updateAuthUser(user:User){
    this.currentUserSubject.next(user);
    console.log(this.currentUserSubject.getValue());
  }

  query(config: Filter): Observable<BaseResponseDto> {
    let httpParams = new HttpParams();
    Object.keys(config.filters).forEach(function (key,val) {
   
         httpParams = httpParams.append(key, config.filters[""+key+""]);
    });  
    return this.apiService
    .get(
      '/user/'+config.type,httpParams
     
    );
  } 
  save(user:User): Observable<BaseResponseDto> {      
    if (user.id) {
      return this.apiService.put('/users/' + user.id, user)
        .pipe(map(data => data));
    } else {
      return this.apiService.post('/users', user)
        .pipe(map(data => data));
    }
  }

  destroy(id:string) {
    return this.apiService.delete('/users/' + id);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }



  login(loginModel:LoginModel): Observable<BaseResponseDto>{
   return this.apiService.post('/users/login',loginModel)
    .pipe(map(
      data => {
        
        return data;
      }
    )); 
  }  
  resetPasswordMail(email:string): Observable<BaseResponseDto>{
    return this.apiService.post('/users/resetpasswordemail',{email:email})
     .pipe(map(
       data => {
         return data;
       }
     )); 
   }  

  changePassword(password:string,activationCode:string): Observable<BaseResponseDto>{
    return this.apiService.post('/users/changepassword',{password:password,activationCode:activationCode})
     .pipe(map(
       data => {
         return data;
       }
     )); 
   }  
  
  register(register:RegisterDto): Observable<BaseResponseDto>{
    return this.apiService.post('/users/register',register)
     .pipe(map(
       data => {
         return data;
       }
     )); 
   }  
   
  // register(registerModel:RegisterModel): Observable<User>{
  //   return this.apiService.post('/user/register',registerModel)
  //   .pipe(map(
  //     data => {
  //       this.setAuth(data);
  //       return data;
  //     }
  //   )); 
  // }

  getCurrentUser(): UserDto {
    return this.currentUserSubject.value;
  }






  updatePassword(rePassword:RePasswordDTO): Observable<BaseResponseDto>{
    
    return this.apiService.post('/users/updatePassword',rePassword)
    .pipe(map(
      data => {
        return data;
      }
    )); 
  }


  
}
