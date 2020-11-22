import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams, ToastController } from '@ionic/angular';
import { Member } from 'src/app/cors/models/member.model';
import { MemberService } from 'src/app/cors/services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  flow:any;
  flowClassId:number;
  members:Member[]=[];
  constructor(
    private route: ActivatedRoute,
    private memberService:MemberService,
    public toastController: ToastController
  ) 
  { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.flowClassId=+params['id'];
    });

    this.memberService.getClassMembersAsync(this.flowClassId)
    .subscribe(data=>{
      console.log(data['data'])
      if(!data.hasError){
        this.members=data['data'];
      }else{
        data.errors.forEach(err=>{this.presentToast(err)})
      }
    });
  }
  async presentToast(messages:string) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000
    });
    toast.present();
  }

}
