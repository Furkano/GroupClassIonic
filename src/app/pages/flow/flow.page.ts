import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams, ToastController } from '@ionic/angular';
import { PostDto } from 'src/app/cors/Dto/postDto.model';
import { UserDto } from 'src/app/cors/Dto/userDto.model';
import { Class } from 'src/app/cors/models/class.model';
import { User } from 'src/app/cors/models/user.model';
import { CreatePostRequest } from 'src/app/cors/Requests/createPostRequest';
import { ClassService } from 'src/app/cors/services/class.service';
import { PostService } from 'src/app/cors/services/post.service';
import { UserService } from 'src/app/cors/services/user.service';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.scss'],
})
export class FlowPage implements OnInit {
  postForm:FormGroup;
  flowClassId:number;
  flowClass:Class;
  currenUser:UserDto;
  postDto:PostDto;
  flowPostDtos:PostDto[]=[];
  flow:any;
  createPostRequest:CreatePostRequest=new CreatePostRequest();

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private postService:PostService,
    private classService:ClassService,
    public toastController: ToastController,
    private route: ActivatedRoute
    ) 
    {
      this.postForm=formBuilder.group({
        body:["",[Validators.required,Validators.minLength(10)]],
        title:["",[Validators.required,Validators.minLength(5)]]
      });
      
    }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.flowClassId=+params['id'];
    });
    this.classService.getClassWithId(this.flowClassId)
    .subscribe(data=>{
      if(!data.hasError){
        this.flowClass=data['data'];
      }else{
        data.errors.forEach(err=>{this.presentToast(err)})
      }
    });

    this.currenUser=this.userService.getCurrentUser();

    this.loadPost();

  }
  loadPost(){
    this.postService.getClassPosts(this.flowClassId)
    .subscribe(data=>{
      if(!data.hasError){
        this.flowPostDtos=data['data'];
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
  logOut(){
    this.userService.purgeAuth();
    this.router.navigate([""]);
  }
  get f(){return this.postForm.controls}
  share(){
    let form = this.f;
    console.log(this.f.body.value)
    console.log(this.f.title.value)
    this.createPostRequest.Title=form.title.value;
    this.createPostRequest.Body=form.body.value;
    this.createPostRequest.Classid=this.flowClassId;
    this.createPostRequest.Userid=this.currenUser.id;
    this.postService.postAsync(this.createPostRequest)
    .subscribe(data=>{
      if(!data.hasError){
        this.postDto=data['data'];
        this.postForm.reset();
        this.loadPost();
      }else{
        data.errors.forEach(err=>{this.presentToast(err)})
      }
    });
  }
  back(){
    this.router.navigate(["classes"])
  }
}
