import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { priceEn } from 'src/utils/constants/languages/en/price';
import { priceEs } from 'src/utils/constants/languages/es/price';

interface Service {
  id: string;  // Asumimos que agregamos un identificador único
  name: string;
  price: number;
}

@Component({
  selector: 'app-cash',
  templateUrl: './cash.page.html',
  styleUrls: ['./cash.page.scss']
})
export class CashPage implements OnInit {
  newService: string = '';
  newPrice!: number | null;
  services: Service[] = [];
  
    languageStore!: string;
   stringPriceHTML: any;


  
  constructor(private alertController: AlertController,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      this.services = JSON.parse(storedServices);
    }
    //console.log(this.services,'this.services');
    this.getLanguage()
    
  }

  async addService(): Promise<void> {
    if (this.newService && this.newPrice) {
      const newService: Service = {
        id: this.generateUniqueId(),  // Genera un ID único para cada nuevo servicio
        name: this.newService,
        price: this.newPrice
      };
      this.services.push(newService);
      localStorage.setItem('services', JSON.stringify(this.services));
      this.newService = '';
      this.newPrice = null;
    }
  }

  

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);  // Un simple generador de IDs
  }

  async deleteService(serviceId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar Servicio',
      message: '¿Estás seguro de querer eliminar este servicio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.services = this.services.filter(service => service.id !== serviceId);
            localStorage.setItem('services', JSON.stringify(this.services));
          },
        },
      ],
    });

    await alert.present();
  }

  async editService(index: number): Promise<void> {
    const editedService = this.services[index];
    const alert = await this.alertController.create({
      header: 'Editar Servicios',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: editedService.name,
          placeholder: 'Nuevo nombre del servicio'
        },
        {
          name: 'price',
          type: 'number',
          value: editedService.price,
          placeholder: 'Nuevo precio del servicio'
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
            const newName = data.name.trim();
            const newPrice = parseFloat(data.price);
            if (newName && !isNaN(newPrice)) {
              editedService.name = newName;
              editedService.price = newPrice;
              this.services[index] = editedService;
              localStorage.setItem('services', JSON.stringify(this.services));
            }
          }
        }
      ]
    });

    await alert.present();
  }
  
  
  
      getLanguage(){
    const storeLanguage = localStorage.getItem('language');
    if (storeLanguage) this.languageStore = storeLanguage
    this.updateLanguageContent();

    console.log(this.languageStore, 'languageStore');
    console.log(this.stringPriceHTML,'stringPriceHTML');
    
  }
  updateLanguageContent() {
    this.stringPriceHTML = (this.languageStore === 'es') ? priceEs : priceEn;
    this.cdr.detectChanges();  // Forzar la detección de cambios para actualizar la vista
    console.log(this.stringPriceHTML, 'stringPriceHTML');
  }
}
