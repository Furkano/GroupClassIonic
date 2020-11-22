import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { UserDto } from 'src/app/cors/Dto/userDto.model';
import { Class } from 'src/app/cors/models/class.model';
import { ClassService } from 'src/app/cors/services/class.service';
import { UserService } from 'src/app/cors/services/user.service';
import { CreateClassPage } from '../create-class/create-class.page';
import { JoinClassPage } from '../join-class/join-class.page';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  eduYear:string;
  currentUser:UserDto;
  classes:Class[]=[];
  constructor(
    private modalController:ModalController,
    private userService:UserService,
    private classService:ClassService,
    public toastController: ToastController,
    private router:Router
    ) { }

  ngOnInit() {
    this.currentUser=this.userService.getCurrentUser();
    console.log(this.currentUser);
    this.classService.getUserClass(this.currentUser.id).subscribe(data=>{
      if(data.hasError){
        data.errors.forEach(err=>{console.log(err)})
      }else{
        this.classes=data['data'];
        console.log(this.classes)
      }
    },err=>{console.log(err)})
  }

  logOut(){
    this.userService.purgeAuth();
    this.router.navigate([""]);
  }

  async presentModal(){
    const modal = await this.modalController.create({
      component: CreateClassPage,
      cssClass: 'my-custom-class',
      swipeToClose: true
    });
    return await modal.present();
  }
  async presentToast(messages:string) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000
    });
    toast.present();
  }
   onChange(SelectedValue){
    console.log(SelectedValue);
  }

  async JoinClass(){
    const modal = await this.modalController.create({
      component: JoinClassPage,
      swipeToClose: true
    });
    return await modal.present();
  }
  GoClass($event:Class){
    console.log($event);
    this.router.navigate(['/home',$event.id]);
  }
}
