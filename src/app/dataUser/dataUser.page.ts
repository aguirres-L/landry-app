import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-dataUser',
  templateUrl: './dataUser.page.html',
})
export class DataUserPage implements OnInit {
  newAliasCvu!: string;
  storageAlias!:string;
  servicesCars: any[] =[];
  constructor(private alertController: AlertController) {}

  ngOnInit() {
    const storedAliasCvu = localStorage.getItem('aliasCvu');
    if (storedAliasCvu) {
      this.storageAlias = storedAliasCvu;
    }
  console.log(this.storageAlias,'storageAlias');
    
  }
  
    getLocalServicesCars(){
    const storeServiceCars = localStorage.getItem('services');
    if(storeServiceCars) this.servicesCars = JSON.parse(storeServiceCars)
    console.log('services',this.servicesCars);
   }

  addAlias(): void {
    if (this.newAliasCvu && this.newAliasCvu.trim() !== '') {
      // Guardar en localStorage
      localStorage.setItem('aliasCvu', JSON.stringify(this.newAliasCvu));
    //  console.log('Alias/CVU agregado:', this.newAliasCvu);
      // Limpiar el campo después de guardar
      this.newAliasCvu = '';
    } else {
      // Manejar el caso de que no se haya ingresado un Alias/CVU válido
      console.error('No se ha proporcionado un Alias/CVU válido');
    }
  }
  
  async editAlias(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Editar Alias/CVU',
      inputs: [
        {
          name: 'alias',
          type: 'text',
          value: this.storageAlias,
          placeholder: 'Nuevo Alias/CVU'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const newAlias = data.alias.trim();
            if (newAlias) {
              this.storageAlias = newAlias;
              localStorage.setItem('aliasCvu', newAlias);
            }
          }
        }
      ]
    });

    await alert.present();
  }
  
}
