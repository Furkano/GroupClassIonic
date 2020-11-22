import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams, ToastController } from '@ionic/angular';
import { Class } from 'src/app/cors/models/class.model';
import { ClassService } from 'src/app/cors/services/class.service';
import { MemberService } from 'src/app/cors/services/member.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  flow:any;
  flowClassId:number;
  flowClass:Class;
  constructor(
    private route: ActivatedRoute,
    private memberService:MemberService,
    public toastController: ToastController,
    private classService:ClassService,
    private router:Router
  ) 
  {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.flowClassId=+params['id'];
    });

    this.classService.getClassWithId(this.flowClassId)
    .subscribe(data=>{
      if(!data.hasError){
        this.flowClass=data['data'];
        console.log(data['data'])
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
  back(){
    this.router.navigate(["classes"])
  }
}
