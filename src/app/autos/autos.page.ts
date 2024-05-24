import { ChangeDetectorRef, Component,OnInit,  } from '@angular/core';
import { carsEn } from 'src/utils/constants/languages/en/autos';
import { carsEs } from 'src/utils/constants/languages/es/autos';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {
  cars: { brand: string, model: string }[] = [];
  clients: any[] = [];
  servicesCars: any[] =[];
  
  languageStore!: string;
  stringAutoHTML: any;


  constructor(private cdr: ChangeDetectorRef) { } 

  async ngOnInit() {
    this.getLocalClients()
    this.getLocalServicesCars()
    this.getLanguage()
    
  }

  getLocalClients(){
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      this.clients = JSON.parse(storedClients);
      console.log('clients',this.clients);
    }
  }

   getLocalServicesCars(){
    const storeServiceCars = localStorage.getItem('services');
    if(storeServiceCars) this.servicesCars = JSON.parse(storeServiceCars)
    console.log('services',this.servicesCars);
   }

  addCar() {
    // Aquí puedes implementar la lógica para agregar un auto
    // Por ejemplo, podrías abrir un modal para que el usuario ingrese los detalles del auto
    // Y luego agregarlo a la lista de autos.
    // Por ahora, solo agregaré autos ficticios para demostrar la funcionalidad.

    this.cars.push({ brand: 'Marca', model: 'Modelo' });
  }
  
  getLanguage(){
    const storeLanguage = localStorage.getItem('language');
    if (storeLanguage) this.languageStore = storeLanguage
    this.updateLanguageContent();

    console.log(this.languageStore, 'languageStore');
    console.log(this.stringAutoHTML.clientsList.clients,'stringAutoHTML');
    
  }
  updateLanguageContent() {
    this.stringAutoHTML = (this.languageStore === 'es') ? carsEs : carsEn;
    this.cdr.detectChanges();  // Forzar la detección de cambios para actualizar la vista
    console.log(this.stringAutoHTML, 'stringAutoHTML');
  }
  
}
