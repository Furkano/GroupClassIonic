import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from './cors/services/user.service';
import { UserDto } from './cors/Dto/userDto.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  currentUser: UserDto;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    userService:UserService,private router: Router
  ) {
    this.initializeApp();
    userService.populate();
    userService.currentUser.subscribe(data=>{
      console.log(data);
      if(data){
        this.currentUser=data;
        userService.setUser(this.currentUser);
      }else{
        this.router.navigateByUrl("");
      } 
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
