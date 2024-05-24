/* import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
    document.addEventListener('pause', this.onAppPause.bind(this));
  }

  ngOnDestroy() {
    // Eliminar el listener cuando la página se destruye para evitar fugas de memoria
    document.removeEventListener('pause', this.onAppPause.bind(this));
  }


  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      
      // Usar AuthService para validar el usuario
      if (this.authService.login(username, password)) {
        console.log('Login successful');
        this.navCtrl.navigateForward('/folder/Inbox'); // Navegar a una página protegida después del login exitoso
      } else {
        console.log('Login failed');
      }
    }
  }

  onAppPause() {
    // Limpiar la sesión cuando la aplicación se pausa (cierra)
    localStorage.removeItem('authenticatedUser');
  }
}
 */
 
 
 
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
     if (this.loginForm.valid) {
      this.isLoading = true;
       const { username, password } = this.loginForm.value;
 
       // Validar el usuario en Firestore
       this.userLaundryService.validateUser(username, password).subscribe(async (isValidUser) => {
        this.isLoading = false;
         if (isValidUser) {
         
         console.log(isValidUser, 'isValidUser');
           
        /*    const loginSuccessful = await this.authService.login(username, password);
           console.log(loginSuccessful,'loginSuccessful'); */
           
           if (isValidUser) {
           
             this.navCtrl.navigateForward('/folder/Inbox');
           } else {
             console.log('Login failed: Authentication failed');
           }
         } else {
           console.log('Login failed: User validation failed');
         }
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
 