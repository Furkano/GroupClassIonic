import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterDto } from 'src/app/cors/Dto/registerDto.model';
import { LoginModel } from 'src/app/cors/models/login.model';
import { UserService } from 'src/app/cors/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  loginForm:FormGroup;
  registerDto:RegisterDto=new RegisterDto();
  loginDto:LoginModel= new LoginModel();
  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private router:Router,
    public toastController: ToastController
    ) { }
  
  get f() { return this.registerForm.controls; }
  get f2() { return this.loginForm.controls; }
  ngOnInit() {
    this.registerForm=this.formBuilder.group({
      firstname:[null,[Validators.required,Validators.maxLength(20),Validators.minLength(4)]],
      lastname:[null,[Validators.required,Validators.maxLength(20),Validators.minLength(4)]],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(6)]],
      schoolNumber:[null,[Validators.required,Validators.minLength(9),Validators.maxLength(10)]]
    });
    this.loginForm=this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(6)]]
    });
    
  }
  onSubmit(){
    console.log(this.registerForm.controls)
    let form=this.registerForm.controls;
    this.registerDto.email=form.email.value;
    this.registerDto.firstname=form.firstname.value;
    this.registerDto.lastname=form.lastname.value;
    this.registerDto.schoolNumber=form.schoolNumber.value;
    this.registerDto.password=form.password.value;
    this.userService.register(this.registerDto).subscribe(data=>{
      console.log(data);
      if(!data.hasError){
        //Başarılı Kayıt
        this.presentToast("Kayıt Başarılı Yönlendiriliyorsunuz.");
        this.userService.setAuth(data['data']);
        this.router.navigate(['classes']);
      }else{
        //Error message
        
        data.errors.forEach(err=>{console.log(err)})
      }
    })
  }
  onLogin(){
    console.log(this.loginForm.controls)
    let form= this.loginForm.controls;
    this.loginDto.email=form.email.value;
    this.loginDto.password=form.password.value;
    this.userService.login(this.loginDto).subscribe(data=>{
      if(!data.hasError){
        console.log(data);
        this.presentToast("Giriş Başarılı Yönlendiriliyorsunuz.");
        this.userService.setAuth(data['data']);
        this.router.navigate(['classes']);
      }else{
        data.errors.forEach(err=>{console.log(err)})
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
}
