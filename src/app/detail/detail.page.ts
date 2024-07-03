import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { detailEn } from 'src/utils/constants/languages/en/detail';
import { detailEs } from 'src/utils/constants/languages/es/detail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  clientId!: string;
  client: any;
  servicesCars: any[] =[];
  aliasCvuStorage!:string;
  
  
languageStore!: string;
  stringDetailHTML: any;
  
  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      // Ahora puedes usar el ID del cliente para recuperar los datos del cliente desde el localStorage
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      this.client = clients.find((client: any) => client.id === this.clientId);
      
      // Cruzar los datos del cliente con la información de los servicios disponibles
      console.log(this.client,'client');
      
      this.client.services = this.servicesCars.filter((service: any) => this.client[service.name.toLowerCase()]);
      
      
      console.log(this.clientId, 'clientId');
      console.log(this.client, 'client');
    });
  
    this.getLocalServicesCars();
    this.getAliasStorage()  
    this.getLanguage()
  }
  getTotal(): number {
    return this.client.servicioLavado.reduce((acc:any, servicio:any) => acc + servicio.price, 0);
  }
  
 getLocalServicesCars(){
    // Aquí obtienes los servicios disponibles, por ejemplo, desde localStorage
    const storeServiceCars = localStorage.getItem('services');
    if(storeServiceCars) this.servicesCars = JSON.parse(storeServiceCars);
    console.log('services',this.servicesCars);
  }
  callClient() {
    // Implementa la lógica para realizar una llamada al cliente
    // Por ejemplo, podrías mostrar un mensaje de confirmación antes de realizar la llamada
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Comunicación',
      message: '¿Deseas comunicar al cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Comunicar',
          handler: () => {
            
            console.log('listo');
            
          
            const message = encodeURIComponent(
              'Hola ' +
                this.client.name +
                ', ¿cómo estás?. El vehiculo ya esta listo para retirar  🚘 🫧 '
            );
            window.open(
              'https://wa.me/' + this.client.phone + '?text=' + message
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteClient() {
    const storeServiceCars = localStorage.getItem('services');
    if(storeServiceCars) this.servicesCars = JSON.parse(storeServiceCars);
    console.log('services',this.servicesCars);
    const alerDelet = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Deseas Eliminar al cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Elimina al cliente de la lista
            let clients = JSON.parse(localStorage.getItem('clients') || '[]');
            clients = clients.filter(
              (client: any) => client.id !== this.clientId
            );
            localStorage.setItem('clients', JSON.stringify(clients));

            // Redirige al usuario a la página de autos
            window.location.href = '/autos';
          },
        },
      ],
    });
    await alerDelet.present()
  }
  
  getAliasStorage() {
    try {
      const storedAliasCvu = localStorage.getItem('aliasCvu');
      if (storedAliasCvu) {
        // Intenta parsearlo como JSON
        this.aliasCvuStorage = storedAliasCvu
      }
    } catch (error) {
      // Si hay un error de análisis, simplemente usa la cadena almacenada tal cual
      console.error('Error parsing aliasCvu from localStorage:', error);
    }
  }
  
  
  async paymentTransfer(){
    const alert = await this.alertController.create({
      header: 'Metodo Transferencia',
      message: '¿Deseas enviar detalles?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Comunicar',
          handler: () => {
            
            console.log('listo');
            
          
            const message = encodeURIComponent(
              'Alias: '+this.aliasCvuStorage+'  Monto : $ '+ this.getTotal()
            );
            window.open(
              'https://wa.me/' + this.client.phone + '?text=' + message
            );
          },
        },
      ],
    });

    await alert.present();
  }
  
  
   getLanguage(){
    const storeLanguage = localStorage.getItem('language');
    if (storeLanguage) this.languageStore = storeLanguage
    this.updateLanguageContent();

    console.log(this.languageStore, 'languageStore');
    console.log(this.stringDetailHTML.clientsList,'stringDetailHTML');
    
  }
  updateLanguageContent() {
    this.stringDetailHTML = (this.languageStore === 'es') ? detailEs : detailEn;
    this.cdr.detectChanges();  // Forzar la detección de cambios para actualizar la vista
    console.log(this.stringDetailHTML, 'stringDetailHTML');
  }
}
