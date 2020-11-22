import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { UserDto } from 'src/app/cors/Dto/userDto.model';
import { Class } from 'src/app/cors/models/class.model';
import { User } from 'src/app/cors/models/user.model';
import { AddMemberRequest } from 'src/app/cors/Requests/add.member.request';
import { ClassService } from 'src/app/cors/services/class.service';
import { MemberService } from 'src/app/cors/services/member.service';
import { UserService } from 'src/app/cors/services/user.service';

@Component({   
  selector: 'app-join-class',
  templateUrl: './join-class.page.html',
  styleUrls: ['./join-class.page.scss'],
})
export class JoinClassPage implements OnInit {
  searchForm:FormGroup;
  searhedClass:Class=null;
  currentUser:UserDto;
  addMemberRq:AddMemberRequest = new AddMemberRequest();
  constructor(private router:Router,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private classService:ClassService,
    public toastController: ToastController,
    private memberService:MemberService,
    private userService:UserService
    ) 
    {    
      this.searchForm=this.formBuilder.group({
      alphaNumerikCode:[null,[Validators.required,Validators.minLength(8)]]
    }); 
    } 

  ngOnInit() {
    this.currentUser=this.userService.getCurrentUser();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  backClasses(){
    this.router.navigate(['classes']);
  }
  get f() { return this.searchForm.controls; }
  GetClasWithAlphaCode(){
    console.log(this.searchForm.controls.alphaNumerikCode.value)
    this.classService.getClassWithCode(this.searchForm.controls.alphaNumerikCode.value)
      .subscribe(data=>{
        if(!data.hasError){
          this.searhedClass=data['data'];
        }else{
          data.errors.forEach(err=>{this.presentToast(err)})
        }
      })
  }
  async presentToast(messages:string) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000
    });
    toast.present();
  }
  JoinClass(){
    this.addMemberRq.Classid=this.searhedClass.id;
    this.addMemberRq.Userid=this.currentUser.id;
    this.memberService.addMemberAsync(this.addMemberRq)
    .subscribe(data=>{
      if(!data.hasError){
        this.presentToast("Başarılı bir şekilde sınıfa üye oldunuz.");
        this.router.navigate(['/home/'+this.searhedClass.id+'/flow/',this.searhedClass.id]);
        this.dismiss();
      }else{
        data.errors.forEach(err=>{this.presentToast(err)})
      }
    })
  }
}
