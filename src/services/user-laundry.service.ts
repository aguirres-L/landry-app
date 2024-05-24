/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLaundryService {

  getUsers(): { username: string, password: string }[] {
    const usersString = localStorage.getItem('userLaundry');
    return usersString ? JSON.parse(usersString) : [];
  }

  validateUser(username: string, password: string): boolean {
    const usersLocal = this.getUsers();
    console.log(username, password, 'datos user desde user-laundry');
    console.log(usersLocal, 'usersLocal desde user-laundry-LocalSt');

    if (Array.isArray(usersLocal)) {
      for (const user of usersLocal) {
        if (user.username === username && user.password === password) {
          return true;
        }
      }
    }
    return false;
  }
}
 */
 
 // src/app/services/user-laundry.service.ts
 import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLaundryService {

  constructor(private firestore: AngularFirestore) {}

  // Obtener el documento userPrueba dentro de userLaundry
  getUserPrueba(): Observable<any> {
    return this.firestore.collection('userLaudnry').doc('userPrueba').valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching userPrueba:', error);
        return of(null);
      })
    );
    
  /*   return this.firestore.collection('userLaudnry').valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching userLaudnry documents:', error);
        return of([]); // Devuelve un arreglo vacío en caso de error
      })
    ); */
  }

  // Validar usuario específico
  validateUser(username: string, password: string): Observable<boolean> {
    console.log(username, password, 'info parametro function validateUser');

    return this.getUserPrueba().pipe(
      map(user => {
        console.log(user, 'user desde user-laundry function validateUser');

        if (user && user.name && user.password) {
          return user.name === username && user.password === password;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error validating user:', error);
        return of(false);
      })
    );
  }
}
