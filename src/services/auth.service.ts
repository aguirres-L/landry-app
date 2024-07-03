/* import { Injectable } from '@angular/core';
import { UserLaundryService } from './user-laundry.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUser: { username: string, password: string } | null = null;

  constructor(private userLaundryService: UserLaundryService) {}

  login(username: string, password: string): boolean {
    if (this.userLaundryService.validateUser(username, password)) {
      this.authenticatedUser = { username, password };
      localStorage.setItem('authenticatedUser', JSON.stringify(this.authenticatedUser)); // Persist authentication state
      return true;
    }
    return false;
  }

  logout(): void {
    this.authenticatedUser = null;
    localStorage.removeItem('authenticatedUser'); // Clear authentication state
  }

  isAuthenticated(): boolean {
    if (this.authenticatedUser) {
      return true;
    }
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      this.authenticatedUser = JSON.parse(storedUser);
      return true;
    }
    return false;
  }
}
 */
 
 // src/app/services/auth.service.ts

 import { Injectable } from '@angular/core';
 import { UserLaundryService } from './user-laundry.service';
 
 @Injectable({
   providedIn: 'root'
 })
 export class AuthService {
 
 
   private authenticatedUser: { username: string, password: string } | null = null;
 
   constructor(private userLaundryService: UserLaundryService) {}
 
  isValiderUserDB:boolean|false|null=null
   async login(username: string, password: string): Promise<boolean> {
     // Validar los datos de usuario con los datos almacenados en Firestore
     const isValidUser = await this.userLaundryService.validateUser(username, password).toPromise();
    
      console.log(isValidUser,'desde isValidUser');
      
    
     if (isValidUser) {
      this.isValiderUserDB =  isValidUser;
       this.authenticatedUser = { username, password };
       localStorage.setItem('authenticatedUser', JSON.stringify(this.authenticatedUser));
       console.log('Usuario autenticado:', this.authenticatedUser);
       return true;
     } else {
       console.log('Usuario no válido');
       return false;
     }
   }
 
   logout(): void {
    this.isValiderUserDB = false;
     localStorage.removeItem('authenticatedUser');
     console.log('Usuario desconectado');
   }
 
 
  async  isAuthenticated() {
    if(this.isValiderUserDB) return  this.isValiderUserDB;
  return false
}
}