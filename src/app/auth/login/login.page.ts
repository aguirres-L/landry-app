
 
 
 // src/app/pages/login/login.page.ts
 
 
 import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { NavController } from '@ionic/angular';
 import { AuthService } from '../../../services/auth.service';
 import { UserLaundryService } from '../../../services/user-laundry.service';
 
 @Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
 })
 export class LoginPage implements OnInit {
   loginForm!: FormGroup;
 
   isLoading = false;
   msjErrorUser = false;
   
   constructor(
     private formBuilder: FormBuilder,
     private navCtrl: NavController,
     private authService: AuthService,
     private userLaundryService: UserLaundryService
   ) {}
 
   ngOnInit() {
     this.loginForm = this.formBuilder.group({
       username: ['', [Validators.required]],
       password: ['', [Validators.required, Validators.minLength(6)]],
     });
 
     document.addEventListener('pause', this.onAppPause.bind(this));
   }
 
   ngOnDestroy() {
     document.removeEventListener('pause', this.onAppPause.bind(this));
   }
 
   async onLogin() {
     this.isLoading = true;
     
     if (this.loginForm.valid) {
       const { username, password } = this.loginForm.value;
 
       // Validar el usuario en Firestore
       this.userLaundryService.validateUser(username, password).subscribe(async (isValidUser) => {
         if (isValidUser) {
         
         console.log(isValidUser, 'isValidUser');
           
        /*    const loginSuccessful = await this.authService.login(username, password);
           console.log(loginSuccessful,'loginSuccessful'); */
           
           if (isValidUser) {
        this.isLoading = false;
           
             this.navCtrl.navigateForward('/folder/Inbox');
           } else {
             console.log('Login failed: Authentication failed');
           }
         } else {
           console.log('Login failed: User validation failed');
           this.isLoading = false;
           this.msjErrorUser = true;
          }
          
          setTimeout(() => {
            this.msjErrorUser=false;
            this.loginForm.reset();
         }, 4000);
          
       }, error => {
         console.error('Error during login process:', error);
         this.isLoading = false;
         
       });
     }
     
     
   }
 
   onAppPause() {
     localStorage.removeItem('authenticatedUser');
   }
 }
 